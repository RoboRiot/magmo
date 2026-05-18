#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import process from "process";
import { OpenAI } from "openai";
import { initializeApp, getApps, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const SUPPORTED_EXTENSIONS = new Set([
  ".pdf",
  ".txt",
  ".md",
  ".html",
  ".htm",
  ".xhtml",
  ".xml",
  ".csv",
  ".log",
  ".inf",
]);

const DEFAULT_IGNORED_DIRS = new Set([
  ".git",
  "node_modules",
  "_vti_cnf",
  "_vti_pvt",
]);

function printUsage() {
  console.log(`
Usage:
  node scripts/ingest-service-docs.mjs --source "<folder>" [options]

Required:
  --source <path>                 Local root folder containing service docs

Options:
  --collection <name>             Firestore collection for chunks (default: ServiceDocChunks)
  --vendor <name>                 Metadata tag, e.g. Toshiba
  --modality <name>               Metadata tag, e.g. CT
  --machine-family <name>         Metadata tag, e.g. 32-64
  --embedding-model <name>        OpenAI embedding model (default: text-embedding-3-large)
  --chunk-size <n>                Characters per chunk (default: 1400)
  --overlap <n>                   Overlap between chunks (default: 220)
  --scan-only                     List supported/text-like files only (no OpenAI/Firebase calls)
  --local-only                    Skip Firestore/Storage writes, only produce local store output
  --upload-storage                Also upload source files to Firebase Storage
  --bucket <name>                 Storage bucket override (optional)
  --write-local-store <file>      Also write output JSON for local fallback
  --dry-run                       Parse and embed only, do not write Firestore/Storage
  --help                          Show this message

Examples:
  node scripts/ingest-service-docs.mjs --source "D:\\Service docs\\Toshiba CT\\32-64" --vendor Toshiba --modality CT --machine-family 32-64

  node scripts/ingest-service-docs.mjs --source "D:\\Service docs\\Toshiba CT\\32-64" --vendor Toshiba --modality CT --machine-family 32-64 --upload-storage --write-local-store "pages/api/gpt/knowledge_store.json"
`.trim());
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const eqIndex = token.indexOf("=");
    if (eqIndex > -1) {
      const key = token.slice(2, eqIndex);
      const value = token.slice(eqIndex + 1);
      parsed[key] = value;
      continue;
    }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }
    parsed[key] = next;
    i += 1;
  }
  return parsed;
}

function normalizeDocPath(rootDir, absolutePath) {
  const relative = path.relative(rootDir, absolutePath);
  return relative.split(path.sep).join("/");
}

function normalizeWhitespace(input) {
  return String(input || "")
    .replace(/\u0000/g, " ")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isProbablyBinary(buffer) {
  if (!buffer || buffer.length === 0) return false;
  let zeroCount = 0;
  for (let i = 0; i < buffer.length; i += 1) {
    if (buffer[i] === 0) zeroCount += 1;
  }
  return zeroCount / buffer.length > 0.01;
}

function detectMarkupType(text) {
  const sample = String(text || "").slice(0, 4096).toLowerCase();
  if (!sample.trim()) return null;
  if (
    sample.includes("<!doctype html") ||
    sample.includes("<html") ||
    sample.includes("<body")
  ) {
    return "html";
  }
  if (sample.includes("<?xml") || sample.includes("<!doctype")) {
    return "xml";
  }
  return null;
}

async function sniffTextLikeFile(filePath) {
  const handle = await fs.open(filePath, "r");
  try {
    const maxBytes = 8192;
    const buffer = Buffer.alloc(maxBytes);
    const { bytesRead } = await handle.read(buffer, 0, maxBytes, 0);
    if (!bytesRead) return false;
    const sample = buffer.subarray(0, bytesRead);
    if (isProbablyBinary(sample)) return false;
    const textSample = sample.toString("latin1");
    return Boolean(textSample.trim());
  } finally {
    await handle.close();
  }
}

function decodeTextBuffer(buffer) {
  if (!buffer || buffer.length === 0) return "";
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch (_) {
    return new TextDecoder("windows-1252").decode(buffer);
  }
}

function stripHtml(html) {
  return String(html || "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function chunkText(text, maxChars, overlapChars) {
  const normalized = normalizeWhitespace(text);
  if (!normalized) return [];
  if (normalized.length <= maxChars) return [normalized];

  const chunks = [];
  let start = 0;
  const minPreferredBreak = Math.floor(maxChars * 0.6);

  while (start < normalized.length) {
    let end = Math.min(start + maxChars, normalized.length);

    if (end < normalized.length) {
      const breakParagraph = normalized.lastIndexOf("\n\n", end);
      const breakSpace = normalized.lastIndexOf(" ", end);
      const candidate = Math.max(breakParagraph, breakSpace);
      if (candidate > start + minPreferredBreak) {
        end = candidate;
      }
    }

    const slice = normalized.slice(start, end).trim();
    if (slice) chunks.push(slice);
    if (end >= normalized.length) break;
    start = Math.max(end - overlapChars, start + 1);
  }

  return chunks;
}

async function listSupportedFiles(rootDir, options) {
  const files = [];
  const ignoredDirs = options.ignoredDirs || DEFAULT_IGNORED_DIRS;

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const name = entry.name;
      const absolutePath = path.join(currentDir, name);
      if (entry.isDirectory()) {
        if (ignoredDirs.has(name.toLowerCase()) || name.startsWith(".")) {
          continue;
        }
        await walk(absolutePath);
        continue;
      }
      const ext = path.extname(name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        files.push(absolutePath);
        continue;
      }

      if (!ext) {
        const textLike = await sniffTextLikeFile(absolutePath);
        if (textLike) {
          files.push(absolutePath);
        }
      }
    }
  }

  await walk(rootDir);
  return files;
}

async function extractTextFromPdf(filePath) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const raw = await fs.readFile(filePath);
  const data = new Uint8Array(raw);
  const loadingTask = pdfjs.getDocument({
    data,
    disableWorker: true,
    useSystemFonts: true,
  });
  const pdf = await loadingTask.promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => (typeof item?.str === "string" ? item.str : ""))
      .join(" ");
    pages.push(pageText);
  }

  await loadingTask.destroy();
  return pages.join("\n");
}

async function extractTextFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf") {
    return extractTextFromPdf(filePath);
  }

  const rawBuffer = await fs.readFile(filePath);
  if (isProbablyBinary(rawBuffer)) return "";

  const rawText = decodeTextBuffer(rawBuffer);
  const markupType = detectMarkupType(rawText);
  if (
    ext === ".html" ||
    ext === ".htm" ||
    ext === ".xhtml" ||
    ext === ".xml" ||
    markupType === "html" ||
    markupType === "xml"
  ) {
    return stripHtml(rawText);
  }

  if (
    ext === ".md" ||
    ext === ".txt" ||
    ext === ".csv" ||
    ext === ".log" ||
    ext === ".inf" ||
    !ext
  ) {
    return rawText;
  }

  if (markupType) {
    return stripHtml(rawText);
  }
  return rawText;
}

function getServiceAccountFromEnv() {
  const serviceAccountPath =
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (!serviceAccountPath) return null;
  return { serviceAccountPath };
}

async function initializeFirebaseAdmin() {
  if (getApps().length > 0) return;

  const accountInfo = getServiceAccountFromEnv();
  const appConfig = {};

  if (accountInfo?.serviceAccountPath) {
    const raw = await fs.readFile(accountInfo.serviceAccountPath, "utf8");
    const json = JSON.parse(raw);
    appConfig.credential = cert(json);
    if (json.project_id) appConfig.projectId = json.project_id;
    if (!appConfig.storageBucket && process.env.FIREBASE_STORAGE_BUCKET) {
      appConfig.storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
    }
  } else {
    appConfig.credential = applicationDefault();
    if (process.env.FIREBASE_PROJECT_ID) {
      appConfig.projectId = process.env.FIREBASE_PROJECT_ID;
    }
    if (process.env.FIREBASE_STORAGE_BUCKET) {
      appConfig.storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
    }
  }

  initializeApp(appConfig);
}

async function deleteExistingChunks(db, collectionName, sourcePath) {
  const snap = await db
    .collection(collectionName)
    .where("sourcePath", "==", sourcePath)
    .get();
  if (snap.empty) return 0;

  let pending = 0;
  let deleted = 0;
  let batch = db.batch();
  for (const doc of snap.docs) {
    batch.delete(doc.ref);
    pending += 1;
    deleted += 1;
    if (pending >= 400) {
      await batch.commit();
      batch = db.batch();
      pending = 0;
    }
  }
  if (pending > 0) {
    await batch.commit();
  }
  return deleted;
}

function buildChunkDocId(sourcePath, chunkIndex) {
  return crypto
    .createHash("sha1")
    .update(`${sourcePath}:${chunkIndex}`)
    .digest("hex");
}

function buildFileHash(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

async function maybeUploadToStorage(bucket, absolutePath, destinationPath, dryRun) {
  if (dryRun) return;
  await bucket.upload(absolutePath, {
    destination: destinationPath,
    metadata: {
      metadata: {
        importedBy: "ingest-service-docs.mjs",
      },
    },
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    return;
  }

  const source = args.source ? path.resolve(String(args.source)) : "";
  if (!source) {
    console.error("Missing --source.");
    printUsage();
    process.exit(1);
  }

  const dryRun = Boolean(args["dry-run"]);
  const scanOnly = Boolean(args["scan-only"]);
  const localOnly = Boolean(args["local-only"]);
  const uploadStorage = Boolean(args["upload-storage"]);
  const collectionName = String(args.collection || "ServiceDocChunks");
  const embeddingModel = String(args["embedding-model"] || "text-embedding-3-large");
  const chunkSize = parsePositiveInt(args["chunk-size"], 1400);
  const overlap = parsePositiveInt(args.overlap, 220);
  const writeLocalStore = args["write-local-store"]
    ? path.resolve(String(args["write-local-store"]))
    : "";

  const vendor = args.vendor ? String(args.vendor).trim() : "";
  const modality = args.modality ? String(args.modality).trim() : "";
  const machineFamily = args["machine-family"]
    ? String(args["machine-family"]).trim()
    : "";

  const sourceStat = await fs.stat(source).catch(() => null);
  if (!sourceStat || !sourceStat.isDirectory()) {
    throw new Error(`Source folder does not exist: ${source}`);
  }
  if (localOnly && uploadStorage) {
    throw new Error("--local-only cannot be used with --upload-storage.");
  }

  const files = await listSupportedFiles(source, {});
  if (!files.length) {
    console.log("No supported files found.");
    return;
  }

  console.log(`Found ${files.length} supported files under ${source}`);

  const extensionCounts = files.reduce((acc, absolutePath) => {
    const ext = path.extname(absolutePath).toLowerCase() || "(no-ext)";
    acc[ext] = (acc[ext] || 0) + 1;
    return acc;
  }, {});

  console.log("File types detected:");
  Object.entries(extensionCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([ext, count]) => {
      console.log(`  ${ext}: ${count}`);
    });

  if (scanOnly) {
    console.log("Scan complete (--scan-only). No embeddings or writes were performed.");
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY in environment.");
  }

  const shouldUseFirebase = !localOnly && (!dryRun || uploadStorage);
  let db = null;
  let bucket = null;
  if (shouldUseFirebase) {
    await initializeFirebaseAdmin();
    db = getFirestore();
    const bucketName = args.bucket ? String(args.bucket) : undefined;
    bucket = uploadStorage ? getStorage().bucket(bucketName) : null;
  }
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const localStore = [];
  let importedFiles = 0;
  let skippedFiles = 0;
  let failedFiles = 0;
  let totalChunks = 0;
  let totalEmbeddingTokens = 0;
  let deletedChunks = 0;

  for (const absolutePath of files) {
    const relativePath = normalizeDocPath(source, absolutePath);
    const ext = path.extname(absolutePath).toLowerCase();

    try {
      const extracted = await extractTextFromFile(absolutePath);
      const cleanedText = normalizeWhitespace(extracted);
      if (!cleanedText) {
        skippedFiles += 1;
        console.log(`Skipping (no extracted text): ${relativePath}`);
        continue;
      }

      const chunks = chunkText(cleanedText, chunkSize, overlap);
      if (!chunks.length) {
        skippedFiles += 1;
        console.log(`Skipping (no chunks): ${relativePath}`);
        continue;
      }

      const fileHash = buildFileHash(cleanedText);
      const sourcePath = relativePath;
      const nowIso = new Date().toISOString();

      if (!dryRun && db) {
        deletedChunks += await deleteExistingChunks(db, collectionName, sourcePath);
      }

      let batch = !dryRun && db ? db.batch() : null;
      let pendingWrites = 0;

      for (let index = 0; index < chunks.length; index += 1) {
        const chunkTextValue = chunks[index];
        const embeddingResp = await client.embeddings.create({
          model: embeddingModel,
          input: chunkTextValue,
        });
        const embedding = embeddingResp?.data?.[0]?.embedding || [];
        const tokenCount = embeddingResp?.usage?.total_tokens || 0;
        totalEmbeddingTokens += tokenCount;

        const docData = {
          source: sourcePath,
          sourcePath,
          fileName: path.basename(absolutePath),
          fileExtension: ext,
          text: chunkTextValue,
          embedding,
          embeddingModel,
          tokenCount,
          chunkIndex: index,
          chunkCount: chunks.length,
          fileHash,
          importedAt: FieldValue.serverTimestamp(),
          importedAtIso: nowIso,
          vendor: vendor || null,
          modality: modality || null,
          machineFamily: machineFamily || null,
        };

        localStore.push({
          source: sourcePath,
          text: chunkTextValue,
          embedding,
          embeddingModel,
          vendor: vendor || null,
          modality: modality || null,
          machineFamily: machineFamily || null,
          chunkIndex: index,
          chunkCount: chunks.length,
        });

        if (!dryRun && db) {
          const docId = buildChunkDocId(sourcePath, index);
          const ref = db.collection(collectionName).doc(docId);
          batch.set(ref, docData, { merge: true });
          pendingWrites += 1;

          if (pendingWrites >= 300) {
            await batch.commit();
            batch = db.batch();
            pendingWrites = 0;
          }
        }
      }

      if (!dryRun && db && pendingWrites > 0) {
        await batch.commit();
      }

      if (bucket) {
        const destination = `ServiceDocs/${sourcePath}`;
        await maybeUploadToStorage(bucket, absolutePath, destination, dryRun);
      }

      importedFiles += 1;
      totalChunks += chunks.length;
      console.log(`Imported ${sourcePath} (${chunks.length} chunks)`);
    } catch (error) {
      failedFiles += 1;
      console.error(`Failed ${relativePath}:`, error.message);
    }
  }

  if (writeLocalStore) {
    const payload = JSON.stringify(localStore, null, 2);
    if (!dryRun) {
      await fs.writeFile(writeLocalStore, payload, "utf8");
    }
    console.log(
      `${dryRun ? "Would write" : "Wrote"} local store: ${writeLocalStore} (${localStore.length} chunks)`
    );
  }

  console.log("---- Import summary ----");
  console.log(`Imported files: ${importedFiles}`);
  console.log(`Skipped files: ${skippedFiles}`);
  console.log(`Failed files: ${failedFiles}`);
  console.log(`Deleted previous chunks: ${deletedChunks}`);
  console.log(`Total chunks written: ${totalChunks}`);
  console.log(`Embedding tokens used: ${totalEmbeddingTokens}`);
  console.log(
    `Target collection: ${localOnly ? "(local-only mode: none)" : collectionName}`
  );
  console.log(`Local-only mode: ${localOnly ? "yes" : "no"}`);
  console.log(`Dry run: ${dryRun ? "yes" : "no"}`);
}

main().catch((error) => {
  console.error("Import failed:", error.message);
  process.exit(1);
});

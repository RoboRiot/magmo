import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "../context/AuthUserContext";
import { useRouter } from "next/router";
import LoggedIn from "./LoggedIn";
import firebase from "../context/Firebase";

const documentScopes = [
  {
    label: "GE MRI - Signa HDxt",
    vendor: "GE",
    modality: "MRI",
    machineFamily: "Signa HDxt",
    manualSet: "GE Signa HDxt 1.5T and 3.0T Service Methods",
  },
  {
    label: "Toshiba CT - Aquilion 32/64",
    vendor: "Toshiba",
    modality: "CT",
    machineFamily: "Aquilion 32/64",
    manualSet: "Toshiba CT 32-64 Service Docs",
  },
];
const ASK_MAGMO_CLIENT_TIMEOUT_MS = 165000;
const ASK_MAGMO_CONVERSATION_MESSAGES = 10;
const ASK_MAGMO_USER_CONTEXT_CHARS = 500;
const ASK_MAGMO_ASSISTANT_CONTEXT_CHARS = 1400;
const THINKING_STEPS = [
  { seconds: 0, label: "Reading your question" },
  { seconds: 4, label: "Searching the selected manuals" },
  { seconds: 12, label: "Scoring the best matching sections" },
  { seconds: 24, label: "Checking this chat for follow-up context" },
  { seconds: 36, label: "Drafting a technician-ready answer" },
  { seconds: 55, label: "Still working through the larger manual set" },
  { seconds: 85, label: "Taking extra time to verify the answer" },
];

function getSourcePath(source) {
  if (typeof source === "string") return source;
  if (!source || typeof source !== "object") return "";

  return (
    source.path ||
    source.sourcePath ||
    source.filePath ||
    source.manualPath ||
    source.file ||
    source.source ||
    ""
  );
}

function uniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function findFirstScopeIndex(predicate) {
  const index = documentScopes.findIndex(predicate);
  return index >= 0 ? index : 0;
}

function SourceList({ sources }) {
  const sourcePaths = Array.isArray(sources)
    ? sources.map((source) => getSourcePath(source)).filter(Boolean)
    : [];

  if (sourcePaths.length === 0) return null;

  return (
    <div
      style={{
        borderTop: "1px solid #33333a",
        marginTop: "0.75rem",
        paddingTop: "0.65rem",
      }}
    >
      <div
        style={{
          color: "#9ca3af",
          fontSize: "0.75rem",
          fontWeight: 600,
          marginBottom: "0.35rem",
        }}
      >
        Sources
      </div>
      <ul
        style={{
          color: "#cbd5e1",
          fontSize: "0.78rem",
          lineHeight: "1.2rem",
          margin: 0,
          paddingLeft: "1rem",
        }}
      >
        {sourcePaths.map((sourcePath, sourceIdx) => (
          <li key={`${sourcePath}-${sourceIdx}`}>{sourcePath}</li>
        ))}
      </ul>
    </div>
  );
}

function getImageName(image) {
  if (typeof image === "string") return image.split("/").pop();
  if (!image || typeof image !== "object") return "Picture";
  return (
    image.displayName ||
    image.label ||
    image.name ||
    image.fileName ||
    image.sourcePath?.split("/").pop() ||
    image.storagePath?.split("/").pop() ||
    "Picture"
  );
}

function PictureChip({ image, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      style={{
        backgroundColor: "#111827",
        border: "1px solid #374151",
        borderRadius: "8px",
        color: "#dbeafe",
        cursor: "pointer",
        fontSize: "0.75rem",
        maxWidth: "100%",
        overflow: "hidden",
        padding: "0.3rem 0.55rem",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      title={getImageName(image)}
    >
      Picture: {getImageName(image)}
    </button>
  );
}

function PictureList({ images, onOpen, title = "Pictures" }) {
  const imageRefs = Array.isArray(images) ? images : [];
  if (!imageRefs.length) return null;

  return (
    <div
      style={{
        borderTop: "1px solid #33333a",
        marginTop: "0.75rem",
        paddingTop: "0.65rem",
      }}
    >
      <div
        style={{
          color: "#9ca3af",
          fontSize: "0.75rem",
          fontWeight: 600,
          marginBottom: "0.35rem",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
        {imageRefs.map((image, imageIdx) => (
          <PictureChip
            key={`${getImageName(image)}-${imageIdx}`}
            image={image}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
}

function getSourcePathsForRequest(sources) {
  if (!Array.isArray(sources)) return [];
  return sources.map((source) => getSourcePath(source)).filter(Boolean).slice(0, 8);
}

function buildConversationForRequest(history) {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (entry) =>
        entry &&
        (entry.role === "user" || entry.role === "assistant") &&
        entry.text &&
        !entry.isThinking &&
        entry.text !== "Thinking..."
    )
    .slice(-ASK_MAGMO_CONVERSATION_MESSAGES)
    .map((entry) => {
      const maxChars =
        entry.role === "assistant"
          ? ASK_MAGMO_ASSISTANT_CONTEXT_CHARS
          : ASK_MAGMO_USER_CONTEXT_CHARS;
      return {
        role: entry.role,
        text: String(entry.text || "").slice(0, maxChars),
        sources: getSourcePathsForRequest(entry.sources),
        feedbackRating: entry.feedbackRating || null,
        feedbackCorrection: entry.feedbackCorrection || "",
      };
    });
}

function getLineIllustrationNumbers(line) {
  const numbers = [];
  const regex = /illustrations?\s+((?:\d+\s*(?:,|and)?\s*)+)/gi;
  let match;

  while ((match = regex.exec(line))) {
    const numberMatches = match[1].match(/\d+/g) || [];
    numberMatches.forEach((value) => numbers.push(Number(value)));
  }

  return Array.from(new Set(numbers.filter(Boolean)));
}

function getImageKey(image) {
  return image?.storagePath || image?.sourcePath || image?.name || getImageName(image);
}

function getImageIllustrationNumber(image) {
  const value = Number(image?.illustrationNumber);
  if (Number.isFinite(value) && value > 0) return value;

  const labelText = `${image?.label || ""} ${image?.displayName || ""}`;
  const match = labelText.match(/illustration\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

function isLikelySectionHeading(line) {
  const trimmed = String(line || "").trim();
  if (!trimmed) return false;
  if (/^(#{1,4})\s+/.test(trimmed)) return true;
  if (/^\s*(?:[-*]|\d+[.)])\s+/.test(line)) return false;
  if (trimmed.length > 80) return false;
  return /^(immediate|safety|setup|procedure|steps?|repair|cleanup|find|inspect|post|after|checks?|troubleshooting|pictures|sources|when)\b/i.test(
    trimmed
  );
}

function isPictureFriendlyLine(line, activeSection) {
  const trimmed = String(line || "").trim();
  if (!trimmed || isLikelySectionHeading(trimmed)) return false;

  const isListLine = /^\s*(?:[-*]|\d+[.)])\s+/.test(line);
  const mentionsVisual = /\b(illustration|picture|photo|image|diagram|shown|figure)\b/i.test(
    trimmed
  );
  const actionLine = /\b(position|place|connect|disconnect|remove|install|inspect|clean|cleanup|repair|replace|refill|restore|verify|check|tighten|loosen|route|record|note|landmark|latch|align|dry|drain|fill|leak[-\s]?check)\b/i.test(
    trimmed
  );
  const usefulSection = /\b(setup|procedure|step|repair|cleanup|find|inspect|post|after|check|troubleshoot|shutdown|safety)\b/i.test(
    activeSection || ""
  );

  return mentionsVisual || (isListLine && actionLine && usefulSection);
}

function renderInlineMarkdown(text, keyPrefix) {
  const input = String(text || "");
  const parts = [];
  const tokenRegex =
    /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;
  let lastIndex = 0;
  let tokenIndex = 0;
  let match;

  while ((match = tokenRegex.exec(input))) {
    if (match.index > lastIndex) {
      parts.push(input.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-inline-${tokenIndex}`;
    if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={key}
          style={{
            backgroundColor: "#111827",
            border: "1px solid #374151",
            borderRadius: "4px",
            color: "#e5e7eb",
            fontSize: "0.82rem",
            padding: "0.05rem 0.25rem",
          }}
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
      if (linkMatch) {
        parts.push(
          <a
            key={key}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#93c5fd" }}
          >
            {linkMatch[1]}
          </a>
        );
      } else {
        parts.push(token);
      }
    }

    tokenIndex += 1;
    lastIndex = match.index + token.length;
  }

  if (lastIndex < input.length) {
    parts.push(input.slice(lastIndex));
  }

  return parts;
}

function renderMarkdownLine(line, keyPrefix) {
  const rawLine = String(line || "");
  const trimmed = rawLine.trim();
  if (!trimmed) {
    return <div style={{ height: "0.55rem" }} />;
  }

  const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
  if (headingMatch) {
    const level = headingMatch[1].length;
    const fontSize =
      level === 1 ? "1.05rem" : level === 2 ? "0.98rem" : "0.92rem";
    return (
      <div
        style={{
          color: "#f9fafb",
          fontSize,
          fontWeight: 700,
          lineHeight: "1.35rem",
          margin: "0.75rem 0 0.35rem",
        }}
      >
        {renderInlineMarkdown(headingMatch[2], keyPrefix)}
      </div>
    );
  }

  const bulletMatch = rawLine.match(/^\s*[-*]\s+(.+)$/);
  if (bulletMatch) {
    return (
      <div style={{ display: "flex", gap: "0.45rem", margin: "0.18rem 0" }}>
        <span style={{ color: "#9ca3af" }}>-</span>
        <span>{renderInlineMarkdown(bulletMatch[1], keyPrefix)}</span>
      </div>
    );
  }

  const numberedMatch = rawLine.match(/^\s*(\d+)[.)]\s+(.+)$/);
  if (numberedMatch) {
    return (
      <div style={{ display: "flex", gap: "0.45rem", margin: "0.18rem 0" }}>
        <span style={{ color: "#9ca3af", minWidth: "1.35rem" }}>
          {numberedMatch[1]}.
        </span>
        <span>{renderInlineMarkdown(numberedMatch[2], keyPrefix)}</span>
      </div>
    );
  }

  if (/^---+$/.test(trimmed)) {
    return (
      <div
        style={{
          borderTop: "1px solid #33333a",
          margin: "0.75rem 0",
          width: "100%",
        }}
      />
    );
  }

  return (
    <div style={{ margin: "0.22rem 0" }}>
      {renderInlineMarkdown(rawLine, keyPrefix)}
    </div>
  );
}

function AnswerTextWithPictures({ text, images, onOpen }) {
  const imageRefs = Array.isArray(images) ? images : [];
  const usedImageKeys = new Set();
  const lines = String(text || "").split("\n");

  function findImagesForLine(line) {
    const illustrationNumbers = getLineIllustrationNumbers(line);
    if (!illustrationNumbers.length) return [];

    const matched = imageRefs.filter((image) =>
      illustrationNumbers.includes(getImageIllustrationNumber(image))
    );
    matched.forEach((image) => usedImageKeys.add(getImageKey(image)));
    return matched;
  }

  function renderPictureRow(pictures, key) {
    if (!pictures.length) return null;
    return (
      <div
        key={key}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.45rem",
          margin: "0.45rem 0 0.7rem",
        }}
      >
        {pictures.map((image, imageIdx) => (
          <PictureChip
            key={`${getImageKey(image)}-${imageIdx}`}
            image={image}
            onOpen={onOpen}
          />
        ))}
      </div>
    );
  }

  const explicitLineImages = lines.map((line) => findImagesForLine(line));
  const explicitMatches = explicitLineImages.reduce(
    (total, matches) => total + matches.length,
    0
  );
  const fallbackImages = imageRefs.filter(
    (image) => !usedImageKeys.has(getImageKey(image))
  );
  const shouldDistributeFallback =
    fallbackImages.length > 0 &&
    (explicitMatches === 0 || fallbackImages.length >= 4);
  let fallbackIndex = 0;
  let fallbackRowsInserted = 0;
  let activeSection = "";

  const rendered = [];
  lines.forEach((line, lineIdx) => {
    if (isLikelySectionHeading(line)) {
      activeSection = line.trim();
    }

    rendered.push(
      <React.Fragment key={`line-${lineIdx}`}>
        {renderMarkdownLine(line, `line-${lineIdx}`)}
      </React.Fragment>
    );

    const matchedImages = explicitLineImages[lineIdx];
    if (matchedImages.length) {
      rendered.push(renderPictureRow(matchedImages, `pictures-${lineIdx}`));
      return;
    }

    if (
      shouldDistributeFallback &&
      fallbackIndex < fallbackImages.length &&
      fallbackRowsInserted < 10 &&
      isPictureFriendlyLine(line, activeSection)
    ) {
      const lineNumberMatch = String(line || "").match(/^\s*(\d+)[.)]\s+/);
      const lineNumber = lineNumberMatch ? Number(lineNumberMatch[1]) : null;
      const exactForStep =
        lineNumber &&
        fallbackImages.find(
          (image, index) =>
            index >= fallbackIndex &&
            getImageIllustrationNumber(image) === lineNumber
        );
      const nextImage = exactForStep || fallbackImages[fallbackIndex];
      const nextImageIndex = fallbackImages.findIndex(
        (image) => getImageKey(image) === getImageKey(nextImage)
      );
      if (nextImageIndex >= 0 && nextImageIndex !== fallbackIndex) {
        fallbackImages.splice(nextImageIndex, 1);
        fallbackImages.splice(fallbackIndex, 0, nextImage);
      }

      usedImageKeys.add(getImageKey(nextImage));
      rendered.push(
        <div
          key={`fallback-pictures-${lineIdx}`}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.45rem",
            margin: "0.45rem 0 0.7rem",
          }}
        >
          <PictureChip image={nextImage} onOpen={onOpen} />
        </div>
      );
      fallbackIndex += 1;
      fallbackRowsInserted += 1;
    }
  });

  const leftoverImages = imageRefs.filter(
    (image) => !usedImageKeys.has(getImageKey(image))
  );

  return (
    <div style={{ whiteSpace: "normal" }}>
      {rendered}
      <PictureList
        images={leftoverImages}
        onOpen={onOpen}
        title="Additional Pictures"
      />
    </div>
  );
}

function formatElapsed(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (!mins) return `${secs}s`;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function getThinkingStep(elapsedSeconds) {
  let current = THINKING_STEPS[0];
  for (const step of THINKING_STEPS) {
    if (elapsedSeconds >= step.seconds) {
      current = step;
    }
  }
  return current;
}

function ThinkingBubble({ startedAt }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick((value) => value + 1);
    }, 550);

    return () => clearInterval(intervalId);
  }, []);

  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - (startedAt || Date.now())) / 1000)
  );
  const dots = ".".repeat((tick % 3) + 1);
  const step = getThinkingStep(elapsedSeconds);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.55rem",
        minWidth: "250px",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            color: "#f9fafb",
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          Thinking{dots}
        </div>
        <div
          style={{
            color: "#9ca3af",
            fontSize: "0.74rem",
            whiteSpace: "nowrap",
          }}
        >
          {formatElapsed(elapsedSeconds)}
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            borderRadius: "999px",
            boxShadow: "0 0 18px rgba(96,165,250,0.55)",
            display: "inline-block",
            height: "0.55rem",
            width: "0.55rem",
          }}
        />
        <span
          style={{
            color: "#cbd5e1",
            fontSize: "0.78rem",
          }}
        >
          {step.label}
        </span>
      </div>

      <div
        style={{
          backgroundColor: "#111827",
          borderRadius: "999px",
          height: "0.35rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg, #38bdf8, #6366f1, #a78bfa)",
            borderRadius: "999px",
            height: "100%",
            transition: "width 500ms ease",
            width: `${Math.min(92, 18 + elapsedSeconds * 1.2)}%`,
          }}
        />
      </div>
    </div>
  );
}

export default function AskMagmo() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Chat log: [{ role: "user" | "assistant", text: string, sources?: [] }]
  const [history, setHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [selectedScopeIndex, setSelectedScopeIndex] = useState(0);
  const [pictureModal, setPictureModal] = useState(null);
  const [sessionId] = useState(
    () => `askmagmo_${Date.now()}_${Math.random().toString(36).slice(2)}`
  );
  const selectedScope = documentScopes[selectedScopeIndex] || documentScopes[0];
  const oemOptions = uniqueValues(documentScopes.map((scope) => scope.vendor));
  const modalityOptions = uniqueValues(
    documentScopes
      .filter((scope) => scope.vendor === selectedScope.vendor)
      .map((scope) => scope.modality)
  );
  const manualScopeOptions = documentScopes.filter(
    (scope) =>
      scope.vendor === selectedScope.vendor &&
      scope.modality === selectedScope.modality
  );

  function handleOemChange(nextVendor) {
    setSelectedScopeIndex(
      findFirstScopeIndex((scope) => scope.vendor === nextVendor)
    );
  }

  function handleModalityChange(nextModality) {
    setSelectedScopeIndex(
      findFirstScopeIndex(
        (scope) =>
          scope.vendor === selectedScope.vendor &&
          scope.modality === nextModality
      )
    );
  }

  const scrollRef = useRef(null);

  const handleBack = () => {
    if (
      typeof window !== "undefined" &&
      document.referrer &&
      document.referrer.startsWith(window.location.origin)
    ) {
      router.back();
      return;
    }

    router.push("/Warehousedb/WarehouseSelect");
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !authUser) {
      console.log("user not logged in, redirecting to /");
      router.push("/");
    }
  }, [authUser, loading, router]);

  // Auto-scroll chat to bottom whenever new messages land
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  async function handleAsk(e) {
    e.preventDefault();
    if (!question.trim() || isSending) return;

    const userMsg = question.trim();

    // 1. Add user question + placeholder assistant bubble
    setHistory((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      {
        role: "assistant",
        text: "",
        isThinking: true,
        startedAt: Date.now(),
      },
    ]);

    // clear input + set flag
    setQuestion("");
    setIsSending(true);

    try {
      const idToken = await firebase.auth().currentUser?.getIdToken();
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        ASK_MAGMO_CLIENT_TIMEOUT_MS
      );

      // 2. Call our backend route with the question and selected document scope
      const res = await fetch("/api/gpt/AskMagmo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
          },
          signal: controller.signal,
          body: JSON.stringify({
            question: userMsg,
            sessionId,
            conversation: buildConversationForRequest(history),
            scope: {
              vendor: selectedScope.vendor,
              modality: selectedScope.modality,
              machineFamily: selectedScope.machineFamily,
              manualSet: selectedScope.manualSet,
            },
            collection: "ServiceDocChunks",
          }),
        }).finally(() => {
          clearTimeout(timeoutId);
        });

      let answerText = "";
      let sources = [];
      let images = [];
      let responseId = "";

      if (res.ok) {
        const data = await res.json();
        answerText = data.answer || "(No answer returned)";
        sources = data.sources || [];
        images = data.images || [];
        responseId = data.responseId || "";
      } else {
        const errorBodyText = await res.text();
        let errorBody = null;

        try {
          errorBody = errorBodyText ? JSON.parse(errorBodyText) : null;
        } catch (parseErr) {
          errorBody = null;
        }

        console.error("AskMagmo API error:", {
          status: res.status,
          body: errorBody || errorBodyText,
        });

        answerText =
          errorBody && errorBody.error
            ? typeof errorBody.error === "string"
              ? errorBody.error
              : JSON.stringify(errorBody.error)
            : "There was an issue reading the service docs. Try again in a moment.";

        if (res.status === 429 && errorBody?.retryAfterSeconds) {
          answerText = `${answerText} Try again in about ${Math.ceil(
            Number(errorBody.retryAfterSeconds) / 60
          )} minute(s).`;
        }
      }

      // 3. Replace that "Thinking..." bubble with the real answer
      setHistory((prev) => {
        const updated = [...prev];
        // walk backward, find the last assistant "Thinking..."
        for (let i = updated.length - 1; i >= 0; i--) {
          if (
            updated[i].role === "assistant" &&
            (updated[i].isThinking || updated[i].text === "Thinking...")
          ) {
            updated[i] = {
              role: "assistant",
              text: answerText,
              sources,
              images,
              responseId,
              question: userMsg,
              scope: {
                vendor: selectedScope.vendor,
                modality: selectedScope.modality,
                machineFamily: selectedScope.machineFamily,
                manualSet: selectedScope.manualSet,
              },
              sessionId,
            };
            break;
          }
        }
        return updated;
      });
    } catch (err) {
      console.error("AskMagmo handleAsk error:", err);
      const errorText =
        err?.name === "AbortError"
          ? "AskMagmo stopped because the manual search took too long. Try a narrower question."
          : "There was an issue reading the service docs. Try again in a moment.";

      // If something blew up, replace "Thinking..." with an error message
      setHistory((prev) => {
        const updated = [...prev];
        for (let i = updated.length - 1; i >= 0; i--) {
          if (
            updated[i].role === "assistant" &&
            (updated[i].isThinking || updated[i].text === "Thinking...")
          ) {
            updated[i] = {
              role: "assistant",
              text: errorText,
            };
            break;
          }
        }
        return updated;
      });
    } finally {
      setIsSending(false);
    }
  }

  async function handleFeedback(messageIndex, rating) {
    const msg = history[messageIndex];
    if (!msg || msg.role !== "assistant" || !msg.responseId) return;

    const correction =
      rating === "not_helpful"
        ? window.prompt("What should Magmo fix or remember for next time?", "")
        : "";

    if (rating === "not_helpful" && correction === null) return;

    try {
      const idToken = await firebase.auth().currentUser?.getIdToken();
      const res = await fetch("/api/gpt/AskMagmoFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          responseId: msg.responseId,
          sessionId: msg.sessionId || sessionId,
          rating,
          correction,
          scope: msg.scope,
          sources: msg.sources,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setHistory((prev) =>
        prev.map((entry, idx) =>
          idx === messageIndex
            ? {
                ...entry,
                feedbackRating: rating,
                feedbackCorrection: correction || "",
              }
            : entry
        )
      );
    } catch (error) {
      console.error("AskMagmo feedback error:", error);
      alert("Could not save AskMagmo feedback.");
    }
  }

  async function openPicture(image) {
    const storagePath =
      image?.storagePath ||
      image?.sourceStoragePath ||
      image?.sourcePath ||
      "";
    const candidates = [];

    if (storagePath) candidates.push(storagePath);
    if (storagePath && !storagePath.startsWith("ServiceDocs/")) {
      candidates.push(`ServiceDocs/${storagePath}`);
    }

    for (const candidate of candidates) {
      try {
        const url = await firebase.storage().ref(candidate).getDownloadURL();
        setPictureModal({
          name: getImageName(image),
          url,
          storagePath: candidate,
        });
        return;
      } catch (error) {
        // Try the next likely storage path.
      }
    }

    alert("Could not open that picture from Firebase Storage.");
  }

  // While auth is resolving, show loading like the rest of your app does
  if (loading || !authUser) {
    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <h3>Loading...</h3>
      </Container>
    );
  }

  return (
    <LoggedIn>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#0f0f10",
          color: "#fff",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <Card
              className="shadow-lg"
              style={{
                backgroundColor: "#1a1a1d",
                border: "1px solid #2d2d32",
                borderRadius: "16px",
              }}
            >
              <Card.Body style={{ padding: "2rem" }}>
                <div className="mb-3">
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={handleBack}
                    style={{
                      borderRadius: "10px",
                      padding: "0.35rem 0.75rem",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    Back
                  </Button>
                </div>

                {/* Header / Branding */}
                <div className="text-center mb-4">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {/* logo image */}
                    <img
                      src="/magmo.png"
                      alt="Magmo"
                      width={160}
                      height={60}
                      style={{
                        objectFit: "contain",
                        filter:
                          "drop-shadow(0 4px 8px rgba(0,0,0,0.7))",
                      }}
                    />
                  </div>

                  {/* <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Ask Magmo
                  </h2>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.4rem",
                      color: "#9ca3af",
                    }}
                  >
                    Your service assistant for MRI / CT install,
                    faults, and parts.
                  </div> */}
                </div>

                {/* Ask form */}
                <Form onSubmit={handleAsk}>
                  <Row className="g-2 mb-3">
                    <Col xs={12} sm={4}>
                      <Form.Group controlId="magmoOem">
                        <Form.Label
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: "#9ca3af",
                          }}
                        >
                          OEM
                        </Form.Label>
                        <Form.Select
                          value={selectedScope.vendor}
                          onChange={(e) => handleOemChange(e.target.value)}
                          style={{
                            backgroundColor: "#0f0f10",
                            borderColor: "#3a3a41",
                            color: "#fff",
                            fontSize: "0.85rem",
                            borderRadius: "10px",
                          }}
                        >
                          {oemOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={4}>
                      <Form.Group controlId="magmoModality">
                        <Form.Label
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: "#9ca3af",
                          }}
                        >
                          Modality
                        </Form.Label>
                        <Form.Select
                          value={selectedScope.modality}
                          onChange={(e) => handleModalityChange(e.target.value)}
                          style={{
                            backgroundColor: "#0f0f10",
                            borderColor: "#3a3a41",
                            color: "#fff",
                            fontSize: "0.85rem",
                            borderRadius: "10px",
                          }}
                        >
                          {modalityOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={4}>
                      <Form.Group controlId="magmoManualSet">
                        <Form.Label
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: "#9ca3af",
                          }}
                        >
                          Manual Set
                        </Form.Label>
                        <Form.Select
                          value={selectedScopeIndex}
                          onChange={(e) =>
                            setSelectedScopeIndex(Number(e.target.value))
                          }
                          style={{
                            backgroundColor: "#0f0f10",
                            borderColor: "#3a3a41",
                            color: "#fff",
                            fontSize: "0.85rem",
                            borderRadius: "10px",
                          }}
                        >
                          {manualScopeOptions.map((scope) => (
                            <option
                              key={scope.label}
                              value={documentScopes.indexOf(scope)}
                            >
                              {scope.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="magmoQuestion" className="mb-3">
                    <Form.Label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "#9ca3af",
                      }}
                    >
                      Ask a question
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder={`Example: "How do I change the coldhead on a GE Signa HDxt?"`}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      style={{
                        backgroundColor: "#0f0f10",
                        borderColor: "#3a3a41",
                        color: "#fff",
                        fontSize: "0.9rem",
                        borderRadius: "10px",
                      }}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end mb-4">
                    <Button
                      type="submit"
                      disabled={isSending || !question.trim()}
                      style={{
                        backgroundColor: "#4f46e5",
                        borderColor: "#4f46e5",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        borderRadius: "10px",
                        padding: "0.5rem 1rem",
                        boxShadow:
                          "0 10px 24px rgba(79,70,229,0.4), 0 2px 4px rgba(0,0,0,0.6)",
                      }}
                    >
                      {isSending ? "Asking..." : "Ask Magmo"}
                    </Button>
                  </div>
                </Form>

                {/* Chat history window */}
                <div
                  style={{
                    border: "1px solid #2d2d32",
                    backgroundColor: "#0f0f10",
                    borderRadius: "12px",
                    maxHeight: "300px",
                    minHeight: "200px",
                    overflowY: "auto",
                    padding: "1rem",
                  }}
                  ref={scrollRef}
                >
                  {history.length === 0 ? (
                    <div
                      style={{
                        color: "#6b7280",
                        fontSize: "0.85rem",
                        textAlign: "center",
                        paddingTop: "2rem",
                      }}
                    >
                      Ask a question to get started.
                    </div>
                  ) : (
                    history.map((msg, idx) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems:
                            msg.role === "user"
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        {/* Bubble */}
                        <div
                          style={{
                            maxWidth: "85%",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            backgroundColor:
                              msg.role === "user"
                                ? "#4f46e5"
                                : "#1f1f22",
                            border:
                              msg.role === "user"
                                ? "1px solid #4f46e5"
                                : "1px solid #2d2d32",
                            color: "#fff",
                            fontSize: "0.9rem",
                            lineHeight: "1.4rem",
                            borderRadius:
                              msg.role === "user"
                                ? "12px 12px 4px 12px"
                                : "12px 12px 12px 4px",
                            padding: "0.75rem 0.9rem",
                            boxShadow:
                              msg.role === "user"
                                ? "0 16px 32px rgba(79,70,229,0.45)"
                                : "0 12px 24px rgba(0,0,0,0.8)",
                          }}
                        >
                          {msg.role === "assistant" && msg.isThinking ? (
                            <ThinkingBubble startedAt={msg.startedAt} />
                          ) : msg.role === "assistant" ? (
                            <AnswerTextWithPictures
                              text={msg.text}
                              images={msg.images}
                              onOpen={openPicture}
                            />
                          ) : (
                            msg.text
                          )}

                          {msg.role === "assistant" && !msg.isThinking && (
                            <SourceList sources={msg.sources} />
                          )}

                          {msg.role === "assistant" &&
                            msg.responseId &&
                            !msg.isThinking &&
                            msg.text !== "Thinking..." && (
                              <div
                                style={{
                                  borderTop: "1px solid #33333a",
                                  marginTop: "0.75rem",
                                  paddingTop: "0.6rem",
                                  display: "flex",
                                  gap: "0.5rem",
                                  alignItems: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleFeedback(idx, "helpful")
                                  }
                                  style={{
                                    background:
                                      msg.feedbackRating === "helpful"
                                        ? "#14532d"
                                        : "#111827",
                                    color: "#d1fae5",
                                    border: "1px solid #374151",
                                    borderRadius: "8px",
                                    padding: "0.25rem 0.55rem",
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  Helpful
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleFeedback(idx, "not_helpful")
                                  }
                                  style={{
                                    background:
                                      msg.feedbackRating === "not_helpful"
                                        ? "#7f1d1d"
                                        : "#111827",
                                    color: "#fee2e2",
                                    border: "1px solid #374151",
                                    borderRadius: "8px",
                                    padding: "0.25rem 0.55rem",
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  Needs Fix
                                </button>
                                {msg.feedbackRating && (
                                  <span
                                    style={{
                                      color: "#9ca3af",
                                      fontSize: "0.72rem",
                                    }}
                                  >
                                    Saved
                                  </span>
                                )}
                              </div>
                            )}
                        </div>

                        {/* role tag */}
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "#6b7280",
                            marginTop: "0.4rem",
                            fontWeight: 500,
                            textAlign:
                              msg.role === "user"
                                ? "right"
                                : "left",
                          }}
                        >
                          {msg.role === "user"
                            ? "You"
                            : "Magmo"}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* footer disclaimer */}
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#4b5563",
                    textAlign: "center",
                    marginTop: "1rem",
                    lineHeight: "1rem",
                  }}
                >
                  Magmo answers using internal service manuals.
                  Always lockout / tagout and follow OEM safety
                  procedures.
                </div>
                {pictureModal && (
                  <div
                    onClick={() => setPictureModal(null)}
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgba(0,0,0,0.78)",
                      bottom: 0,
                      display: "flex",
                      justifyContent: "center",
                      left: 0,
                      padding: "2rem",
                      position: "fixed",
                      right: 0,
                      top: 0,
                      zIndex: 9999,
                    }}
                  >
                    <div
                      onClick={(event) => event.stopPropagation()}
                      style={{
                        backgroundColor: "#111113",
                        border: "1px solid #3a3a41",
                        borderRadius: "12px",
                        boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
                        maxHeight: "90vh",
                        maxWidth: "92vw",
                        padding: "1rem",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          gap: "1rem",
                          justifyContent: "space-between",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            color: "#e5e7eb",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {pictureModal.name}
                        </div>
                        <button
                          type="button"
                          onClick={() => setPictureModal(null)}
                          style={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #4b5563",
                            borderRadius: "8px",
                            color: "#fff",
                            cursor: "pointer",
                            padding: "0.25rem 0.65rem",
                          }}
                        >
                          Close
                        </button>
                      </div>
                      <img
                        src={pictureModal.url}
                        alt={pictureModal.name}
                        style={{
                          display: "block",
                          maxHeight: "78vh",
                          maxWidth: "88vw",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </LoggedIn>
  );
}

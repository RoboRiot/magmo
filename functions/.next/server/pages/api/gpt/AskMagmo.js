module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ({

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("lbpU");


/***/ }),

/***/ "OpXc":
/***/ (function(module, exports) {

module.exports = require("openai");

/***/ }),

/***/ "lbpU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ handler; });

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__("mw/K");
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__("oyvS");
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// EXTERNAL MODULE: external "openai"
var external_openai_ = __webpack_require__("OpXc");

// CONCATENATED MODULE: ./utils/cosineSim.js
function cosineSim(a, b) {
  // a and b are arrays of numbers (embeddings)
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];
    dot += x * y;
    normA += x * x;
    normB += y * y;
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 0;
  return dot / denom;
}
// CONCATENATED MODULE: ./pages/api/gpt/AskMagmo.js



 // how many best chunks to send to the model

const TOP_K = 5; // cache store in memory so we don't read disk every request

let STORE_CACHE = null;

function loadStore() {
  if (STORE_CACHE) return STORE_CACHE; // you're storing knowledge_store.json in the same folder as this route:
  // pages/api/gpt/knowledge_store.json

  const storePath = external_path_default.a.join(process.cwd(), "pages", "api", "gpt", "knowledge_store.json");
  const raw = external_fs_default.a.readFileSync(storePath, "utf-8");
  STORE_CACHE = JSON.parse(raw); // [{ source, text, embedding: [ ...numbers ] }, ...]

  return STORE_CACHE;
}

async function embedQuestion(client, question) {
  const resp = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: [question]
  });
  return resp.data[0].embedding;
}

function buildContextFromChunks(chunks) {
  return chunks.map((c, i) => `Source: ${c.source}\nContent:\n${c.text}`).join("\n\n---\n\n");
}

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed. Send POST with { question }."
    });
  }

  try {
    const {
      question
    } = req.body || {};

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        error: "Missing or invalid 'question' in body."
      });
    } // init OpenAI client with your server-side key


    const client = new external_openai_["OpenAI"]({
      apiKey: process.env.OPENAI_API_KEY
    }); // 1. load all chunks from the local knowledge store

    const store = loadStore(); // array of { source, text, embedding }
    // 2. embed the user's question

    const qVec = await embedQuestion(client, question); // 3. score each chunk by cosine similarity

    const scored = store.map(chunk => {
      const sim = cosineSim(qVec, chunk.embedding);
      return {
        sim,
        chunk
      };
    }); // 4. take the top K most relevant chunks

    scored.sort((a, b) => b.sim - a.sim);
    const topChunks = scored.slice(0, TOP_K).map(x => x.chunk); // 5. build a context block from those chunks

    const contextText = buildContextFromChunks(topChunks); // 6. ask the model to answer USING ONLY THAT CONTEXT

    const completion = await client.responses.create({
      model: "gpt-5",
      // or "gpt-4o" etc. use the model you have quota for
      input: [{
        role: "system",
        content: "You are Magmo, an internal AIS service assistant for MRI/CT installs, faults, and safety. " + "You must answer using ONLY the provided context below. " + "If you are not certain or it is safety critical, say you are not certain and advise escalation. " + "Speak in direct technician language, not marketing language."
      }, {
        role: "user",
        content: `Question: ${question}\n\n` + `Relevant manual context:\n${contextText}`
      }]
    });
    const finalAnswer = completion.output_text || "(No answer)";
    return res.status(200).json({
      answer: finalAnswer
    });
  } catch (err) {
    console.error("AskMagmo API error:", err);
    return res.status(500).json({
      error: "Internal Server Error while answering from manuals."
    });
  }
}

/***/ }),

/***/ "mw/K":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "oyvS":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
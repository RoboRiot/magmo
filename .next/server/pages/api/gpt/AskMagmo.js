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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/gpt/AskMagmo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/gpt/AskMagmo.js":
/*!***********************************!*\
  !*** ./pages/api/gpt/AskMagmo.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handler; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! openai */ "openai");
/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(openai__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_cosineSim__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/cosineSim */ "./utils/cosineSim.js");



 // how many best chunks to send to the model

const TOP_K = 5; // cache store in memory so we don't read disk every request

let STORE_CACHE = null;

function loadStore() {
  if (STORE_CACHE) return STORE_CACHE; // you're storing knowledge_store.json in the same folder as this route:
  // pages/api/gpt/knowledge_store.json

  const storePath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(process.cwd(), "pages", "api", "gpt", "knowledge_store.json");
  const raw = fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(storePath, "utf-8");
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


    const client = new openai__WEBPACK_IMPORTED_MODULE_2__["OpenAI"]({
      apiKey: process.env.OPENAI_API_KEY
    }); // 1. load all chunks from the local knowledge store

    const store = loadStore(); // array of { source, text, embedding }
    // 2. embed the user's question

    const qVec = await embedQuestion(client, question); // 3. score each chunk by cosine similarity

    const scored = store.map(chunk => {
      const sim = Object(_utils_cosineSim__WEBPACK_IMPORTED_MODULE_3__["default"])(qVec, chunk.embedding);
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

/***/ "./utils/cosineSim.js":
/*!****************************!*\
  !*** ./utils/cosineSim.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cosineSim; });
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

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "openai":
/*!*************************!*\
  !*** external "openai" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("openai");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2dwdC9Bc2tNYWdtby5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9jb3NpbmVTaW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJvcGVuYWlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiXSwibmFtZXMiOlsiVE9QX0siLCJTVE9SRV9DQUNIRSIsImxvYWRTdG9yZSIsInN0b3JlUGF0aCIsInBhdGgiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsInJhdyIsImZzIiwicmVhZEZpbGVTeW5jIiwiSlNPTiIsInBhcnNlIiwiZW1iZWRRdWVzdGlvbiIsImNsaWVudCIsInF1ZXN0aW9uIiwicmVzcCIsImVtYmVkZGluZ3MiLCJjcmVhdGUiLCJtb2RlbCIsImlucHV0IiwiZGF0YSIsImVtYmVkZGluZyIsImJ1aWxkQ29udGV4dEZyb21DaHVua3MiLCJjaHVua3MiLCJtYXAiLCJjIiwiaSIsInNvdXJjZSIsInRleHQiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiYm9keSIsIk9wZW5BSSIsImFwaUtleSIsImVudiIsIk9QRU5BSV9BUElfS0VZIiwic3RvcmUiLCJxVmVjIiwic2NvcmVkIiwiY2h1bmsiLCJzaW0iLCJjb3NpbmVTaW0iLCJzb3J0IiwiYSIsImIiLCJ0b3BDaHVua3MiLCJzbGljZSIsIngiLCJjb250ZXh0VGV4dCIsImNvbXBsZXRpb24iLCJyZXNwb25zZXMiLCJyb2xlIiwiY29udGVudCIsImZpbmFsQW5zd2VyIiwib3V0cHV0X3RleHQiLCJhbnN3ZXIiLCJlcnIiLCJjb25zb2xlIiwibGVuZ3RoIiwiZG90Iiwibm9ybUEiLCJub3JtQiIsInkiLCJkZW5vbSIsIk1hdGgiLCJzcXJ0Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FB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T0FBRyxJQUFJWixDQUFDLEdBQUdlLENBQVg7QUFDQUYsU0FBSyxJQUFJYixDQUFDLEdBQUdBLENBQWI7QUFDQWMsU0FBSyxJQUFJQyxDQUFDLEdBQUdBLENBQWI7QUFDRDs7QUFFRCxRQUFNQyxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsSUFBTCxDQUFVTCxLQUFWLElBQW1CSSxJQUFJLENBQUNDLElBQUwsQ0FBVUosS0FBVixDQUFqQztBQUNBLE1BQUlFLEtBQUssS0FBSyxDQUFkLEVBQWlCLE9BQU8sQ0FBUDtBQUVqQixTQUFPSixHQUFHLEdBQUdJLEtBQWI7QUFDRCxDOzs7Ozs7Ozs7OztBQ3BCRCwrQjs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJwYWdlcy9hcGkvZ3B0L0Fza01hZ21vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wYWdlcy9hcGkvZ3B0L0Fza01hZ21vLmpzXCIpO1xuIiwiaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBPcGVuQUkgfSBmcm9tIFwib3BlbmFpXCI7XHJcbmltcG9ydCBjb3NpbmVTaW0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2Nvc2luZVNpbVwiO1xyXG5cclxuLy8gaG93IG1hbnkgYmVzdCBjaHVua3MgdG8gc2VuZCB0byB0aGUgbW9kZWxcclxuY29uc3QgVE9QX0sgPSA1O1xyXG5cclxuLy8gY2FjaGUgc3RvcmUgaW4gbWVtb3J5IHNvIHdlIGRvbid0IHJlYWQgZGlzayBldmVyeSByZXF1ZXN0XHJcbmxldCBTVE9SRV9DQUNIRSA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBsb2FkU3RvcmUoKSB7XHJcbiAgaWYgKFNUT1JFX0NBQ0hFKSByZXR1cm4gU1RPUkVfQ0FDSEU7XHJcblxyXG4gIC8vIHlvdSdyZSBzdG9yaW5nIGtub3dsZWRnZV9zdG9yZS5qc29uIGluIHRoZSBzYW1lIGZvbGRlciBhcyB0aGlzIHJvdXRlOlxyXG4gIC8vIHBhZ2VzL2FwaS9ncHQva25vd2xlZGdlX3N0b3JlLmpzb25cclxuICBjb25zdCBzdG9yZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJwYWdlc1wiLCBcImFwaVwiLCBcImdwdFwiLCBcImtub3dsZWRnZV9zdG9yZS5qc29uXCIpO1xyXG5cclxuICBjb25zdCByYXcgPSBmcy5yZWFkRmlsZVN5bmMoc3RvcmVQYXRoLCBcInV0Zi04XCIpO1xyXG4gIFNUT1JFX0NBQ0hFID0gSlNPTi5wYXJzZShyYXcpOyAvLyBbeyBzb3VyY2UsIHRleHQsIGVtYmVkZGluZzogWyAuLi5udW1iZXJzIF0gfSwgLi4uXVxyXG4gIHJldHVybiBTVE9SRV9DQUNIRTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZW1iZWRRdWVzdGlvbihjbGllbnQsIHF1ZXN0aW9uKSB7XHJcbiAgY29uc3QgcmVzcCA9IGF3YWl0IGNsaWVudC5lbWJlZGRpbmdzLmNyZWF0ZSh7XHJcbiAgICBtb2RlbDogXCJ0ZXh0LWVtYmVkZGluZy0zLWxhcmdlXCIsXHJcbiAgICBpbnB1dDogW3F1ZXN0aW9uXSxcclxuICB9KTtcclxuICByZXR1cm4gcmVzcC5kYXRhWzBdLmVtYmVkZGluZztcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRDb250ZXh0RnJvbUNodW5rcyhjaHVua3MpIHtcclxuICByZXR1cm4gY2h1bmtzXHJcbiAgICAubWFwKFxyXG4gICAgICAoYywgaSkgPT5cclxuICAgICAgICBgU291cmNlOiAke2Muc291cmNlfVxcbkNvbnRlbnQ6XFxuJHtjLnRleHR9YFxyXG4gICAgKVxyXG4gICAgLmpvaW4oXCJcXG5cXG4tLS1cXG5cXG5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICBpZiAocmVxLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcclxuICAgIHJldHVybiByZXNcclxuICAgICAgLnN0YXR1cyg0MDUpXHJcbiAgICAgIC5qc29uKHsgZXJyb3I6IFwiTWV0aG9kIG5vdCBhbGxvd2VkLiBTZW5kIFBPU1Qgd2l0aCB7IHF1ZXN0aW9uIH0uXCIgfSk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBxdWVzdGlvbiB9ID0gcmVxLmJvZHkgfHwge307XHJcblxyXG4gICAgaWYgKCFxdWVzdGlvbiB8fCB0eXBlb2YgcXVlc3Rpb24gIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoNDAwKVxyXG4gICAgICAgIC5qc29uKHsgZXJyb3I6IFwiTWlzc2luZyBvciBpbnZhbGlkICdxdWVzdGlvbicgaW4gYm9keS5cIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbml0IE9wZW5BSSBjbGllbnQgd2l0aCB5b3VyIHNlcnZlci1zaWRlIGtleVxyXG4gICAgY29uc3QgY2xpZW50ID0gbmV3IE9wZW5BSSh7XHJcbiAgICAgIGFwaUtleTogcHJvY2Vzcy5lbnYuT1BFTkFJX0FQSV9LRVksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAxLiBsb2FkIGFsbCBjaHVua3MgZnJvbSB0aGUgbG9jYWwga25vd2xlZGdlIHN0b3JlXHJcbiAgICBjb25zdCBzdG9yZSA9IGxvYWRTdG9yZSgpOyAvLyBhcnJheSBvZiB7IHNvdXJjZSwgdGV4dCwgZW1iZWRkaW5nIH1cclxuXHJcbiAgICAvLyAyLiBlbWJlZCB0aGUgdXNlcidzIHF1ZXN0aW9uXHJcbiAgICBjb25zdCBxVmVjID0gYXdhaXQgZW1iZWRRdWVzdGlvbihjbGllbnQsIHF1ZXN0aW9uKTtcclxuXHJcbiAgICAvLyAzLiBzY29yZSBlYWNoIGNodW5rIGJ5IGNvc2luZSBzaW1pbGFyaXR5XHJcbiAgICBjb25zdCBzY29yZWQgPSBzdG9yZS5tYXAoKGNodW5rKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNpbSA9IGNvc2luZVNpbShxVmVjLCBjaHVuay5lbWJlZGRpbmcpO1xyXG4gICAgICByZXR1cm4geyBzaW0sIGNodW5rIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyA0LiB0YWtlIHRoZSB0b3AgSyBtb3N0IHJlbGV2YW50IGNodW5rc1xyXG4gICAgc2NvcmVkLnNvcnQoKGEsIGIpID0+IGIuc2ltIC0gYS5zaW0pO1xyXG4gICAgY29uc3QgdG9wQ2h1bmtzID0gc2NvcmVkLnNsaWNlKDAsIFRPUF9LKS5tYXAoKHgpID0+IHguY2h1bmspO1xyXG5cclxuICAgIC8vIDUuIGJ1aWxkIGEgY29udGV4dCBibG9jayBmcm9tIHRob3NlIGNodW5rc1xyXG4gICAgY29uc3QgY29udGV4dFRleHQgPSBidWlsZENvbnRleHRGcm9tQ2h1bmtzKHRvcENodW5rcyk7XHJcblxyXG4gICAgLy8gNi4gYXNrIHRoZSBtb2RlbCB0byBhbnN3ZXIgVVNJTkcgT05MWSBUSEFUIENPTlRFWFRcclxuICAgIGNvbnN0IGNvbXBsZXRpb24gPSBhd2FpdCBjbGllbnQucmVzcG9uc2VzLmNyZWF0ZSh7XHJcbiAgICAgIG1vZGVsOiBcImdwdC01XCIsIC8vIG9yIFwiZ3B0LTRvXCIgZXRjLiB1c2UgdGhlIG1vZGVsIHlvdSBoYXZlIHF1b3RhIGZvclxyXG4gICAgICBpbnB1dDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHJvbGU6IFwic3lzdGVtXCIsXHJcbiAgICAgICAgICBjb250ZW50OlxyXG4gICAgICAgICAgICBcIllvdSBhcmUgTWFnbW8sIGFuIGludGVybmFsIEFJUyBzZXJ2aWNlIGFzc2lzdGFudCBmb3IgTVJJL0NUIGluc3RhbGxzLCBmYXVsdHMsIGFuZCBzYWZldHkuIFwiICtcclxuICAgICAgICAgICAgXCJZb3UgbXVzdCBhbnN3ZXIgdXNpbmcgT05MWSB0aGUgcHJvdmlkZWQgY29udGV4dCBiZWxvdy4gXCIgK1xyXG4gICAgICAgICAgICBcIklmIHlvdSBhcmUgbm90IGNlcnRhaW4gb3IgaXQgaXMgc2FmZXR5IGNyaXRpY2FsLCBzYXkgeW91IGFyZSBub3QgY2VydGFpbiBhbmQgYWR2aXNlIGVzY2FsYXRpb24uIFwiICtcclxuICAgICAgICAgICAgXCJTcGVhayBpbiBkaXJlY3QgdGVjaG5pY2lhbiBsYW5ndWFnZSwgbm90IG1hcmtldGluZyBsYW5ndWFnZS5cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHJvbGU6IFwidXNlclwiLFxyXG4gICAgICAgICAgY29udGVudDpcclxuICAgICAgICAgICAgYFF1ZXN0aW9uOiAke3F1ZXN0aW9ufVxcblxcbmAgK1xyXG4gICAgICAgICAgICBgUmVsZXZhbnQgbWFudWFsIGNvbnRleHQ6XFxuJHtjb250ZXh0VGV4dH1gLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBmaW5hbEFuc3dlciA9IGNvbXBsZXRpb24ub3V0cHV0X3RleHQgfHwgXCIoTm8gYW5zd2VyKVwiO1xyXG5cclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgIGFuc3dlcjogZmluYWxBbnN3ZXIsXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJBc2tNYWdtbyBBUEkgZXJyb3I6XCIsIGVycik7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3Igd2hpbGUgYW5zd2VyaW5nIGZyb20gbWFudWFscy5cIixcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3NpbmVTaW0oYSwgYikge1xyXG4gIC8vIGEgYW5kIGIgYXJlIGFycmF5cyBvZiBudW1iZXJzIChlbWJlZGRpbmdzKVxyXG4gIGlmICghYSB8fCAhYiB8fCBhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiAwO1xyXG5cclxuICBsZXQgZG90ID0gMDtcclxuICBsZXQgbm9ybUEgPSAwO1xyXG4gIGxldCBub3JtQiA9IDA7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgeCA9IGFbaV07XHJcbiAgICBjb25zdCB5ID0gYltpXTtcclxuICAgIGRvdCArPSB4ICogeTtcclxuICAgIG5vcm1BICs9IHggKiB4O1xyXG4gICAgbm9ybUIgKz0geSAqIHk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZW5vbSA9IE1hdGguc3FydChub3JtQSkgKiBNYXRoLnNxcnQobm9ybUIpO1xyXG4gIGlmIChkZW5vbSA9PT0gMCkgcmV0dXJuIDA7XHJcblxyXG4gIHJldHVybiBkb3QgLyBkZW5vbTtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvcGVuYWlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9
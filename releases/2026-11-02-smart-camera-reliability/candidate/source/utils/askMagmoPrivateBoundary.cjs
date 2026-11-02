'use strict';

const LEGACY_COLLECTION = 'ServiceDocChunks';
const PRIVATE_ROOTS = new Set(['AskMagmoV2Namespaces', 'AskMagmoPrivate']);

class AskMagmoBoundaryError extends Error {
  constructor(message, status = 403, code = 'legacy_private_resource_denied') {
    super(message);
    this.name = 'AskMagmoBoundaryError';
    this.status = status;
    this.code = code;
  }
}

function validCollection(value) {
  return typeof value === 'string' && value.length > 0 && Buffer.byteLength(value, 'utf8') <= 1500
    && !/[\/\\\u0000-\u001f\u007f]/.test(value) && value !== '.' && value !== '..'
    && !/^__.*__$/.test(value) && !PRIVATE_ROOTS.has(value);
}

function resolveLegacyCollection(requested, configured) {
  if (configured != null && typeof configured !== 'string') {
    throw new AskMagmoBoundaryError('The legacy manual collection is not configured correctly.', 503, 'legacy_collection_misconfigured');
  }
  const serverCollection = configured?.trim() || LEGACY_COLLECTION;
  if (!validCollection(serverCollection)) {
    throw new AskMagmoBoundaryError('The legacy manual collection is not configured correctly.', 503, 'legacy_collection_misconfigured');
  }
  if (requested == null || requested === '') return serverCollection;
  const selected = typeof requested === 'string' ? requested.trim() : '';
  if (!validCollection(selected) || ![LEGACY_COLLECTION, serverCollection].includes(selected)) {
    throw new AskMagmoBoundaryError('This manual collection is not available through the legacy workspace.', 403, 'legacy_collection_denied');
  }
  return selected;
}

function decodePath(value) {
  try { return decodeURIComponent(value); } catch { return value; }
}

function storageObjectPath(reference) {
  if (typeof reference !== 'string') return '';
  let value = reference.trim().replace(/\\/g, '/');
  const gs = /^gs:\/\/[^/]+\/(.*)$/i.exec(value);
  if (gs) value = gs[1];
  else if (/^https?:\/\//i.test(value)) {
    let url;
    try { url = new URL(value); } catch { return value; }
    const object = /\/(?:v0|(?:download\/)?storage\/v1)\/b\/[^/]+\/o\/(.*)$/.exec(url.pathname);
    if (object) value = object[1];
    else if (url.hostname === 'storage.googleapis.com') value = url.pathname.replace(/^\/[^/]+\//, '');
    else value = url.pathname;
  }
  return decodePath(value).replace(/^\/+/, '');
}

function isLegacyStorageAllowed(reference) {
  return !/^AskMagmoPrivate(?:\/|$)/i.test(storageObjectPath(reference));
}

function assertLegacyStorageAllowed(reference) {
  if (!isLegacyStorageAllowed(reference)) {
    throw new AskMagmoBoundaryError('Protected Ask Magmo sources require the private workspace.');
  }
  return reference;
}

module.exports = { AskMagmoBoundaryError, resolveLegacyCollection, isLegacyStorageAllowed, assertLegacyStorageAllowed };

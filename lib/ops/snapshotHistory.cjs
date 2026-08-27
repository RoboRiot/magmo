function splitLatestSnapshot(entries) {
  const snapshots = (Array.isArray(entries) ? entries : []).filter(Boolean);
  if (!snapshots.length) {
    return { latest: null, history: [] };
  }

  return {
    latest: snapshots[snapshots.length - 1],
    history: snapshots.slice(0, -1).reverse(),
  };
}

module.exports = { splitLatestSnapshot };

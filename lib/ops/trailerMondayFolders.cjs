// Reviewed read-only snapshot of the Trailer Projects workspace (13946895).
// Folder membership indicates yard/onsite status, not the identity of an
// onsite client. Refresh this snapshot before applying a migration if Monday
// changes after the recorded date.
const reviewedAt = "2026-08-19T00:00:00-07:00";

const folders = {
  lake_forest: [6, 9, 12, 17, 22, 24, 29, 34, 46, 49],
  onsite: [
    1, 2, 3, 4, 5, 8, 10, 11, 13, 14, 15, 16, 18, 20, 21, 25,
    26, 27, 28, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41, 43,
    44, 45, 47, 48,
  ],
  lathrop: [7, 42],
  ice_rink: [23, 50],
};

const byTrailerNumber = Object.fromEntries(
  Object.entries(folders).flatMap(([folder, numbers]) =>
    numbers.map((number) => [number, folder])
  )
);

module.exports = { byTrailerNumber, folders, reviewedAt };

// Item-specific decisions made after comparing the original backup, current
// record, dated descriptions, active machine, and newest selection history.
// These are intentionally explicit so they remain reviewable and reproducible.
module.exports = {
  AIS17768: {
    current: { trailerId: "AIS41", reason: "AIS41 upgrade kit sent from Lathrop" },
  },
  AIS20366: {
    from: { trailerId: "AIS9", reason: "latest saved machine/history corrected Trailer 48 to Trailer 9" },
  },
  AIS20790: {
    current: { trailerId: "AIS38", reason: "current legacy machine/history is Trailer AIS38 AK 23x" },
  },
  AIS21032: {
    from: { trailerId: "AIS48", machineId: "AIS11646", reason: "description says from Trailer 48 and separately sent to Trailer 40; original Trailer 48 machine was AIS11646" },
  },
  AIS21038: {
    from: { trailerId: "AIS48", machineId: "AIS11646", reason: "description says from Trailer 48 and separately sent to Trailer 40; original Trailer 48 machine was AIS11646" },
  },
  AIS21064: {
    from: { trailerId: "AIS36", reason: "from machine/history is legacy Trailer 36 HDxt 23x" },
  },
  AIS21065: {
    from: { trailerId: "AIS36", reason: "from machine/history is legacy Trailer 36 HDxt 23x" },
  },
  AIS21069: {
    from: { trailerId: "AIS9", reason: "from machine/history is legacy Trailer AIS9 GE Discovery ST" },
  },
  AIS21071: {
    from: { trailerId: "AIS36", reason: "from machine and work order match the Trailer 36 RF cable group" },
  },
  AIS21077: {
    from: { trailerId: "AIS36", reason: "history says test cable returned unused from Trailer 36" },
  },
  AIS23039: {
    from: { trailerId: "AIS36", reason: "latest active machine and history are Trailer 36" },
  },
  AIS23067: {
    from: { trailerId: "AIS9", reason: "latest saved machine/history corrected Trailer 48 to Trailer 9" },
  },
  AIS23068: {
    from: { trailerId: "AIS9", reason: "latest saved machine/history corrected Trailer 48 to Trailer 9" },
  },
  AIS23069: {
    from: { trailerId: "AIS9", reason: "latest saved machine/history corrected Trailer 48 to Trailer 9" },
  },
  AIS23070: {
    from: { trailerId: "AIS9", reason: "latest saved machine/history corrected Trailer 48 to Trailer 9" },
  },
  AIS23071: {
    from: { trailerId: "AIS9", reason: "latest saved machine/history corrected Trailer 48 to Trailer 9" },
  },
  AIS23021: {
    from: { trailerId: "AIS47", reason: "description and from machine say taken from Trailer 47" },
    current: { trailerId: "AIS9", reason: "current machine/history is Trailer AIS9 GE Discovery ST" },
  },
  AIS23260: {
    from: { trailerId: "AIS35", reason: "item name explicitly says from AIS35" },
  },
  AIS23362: {
    from: { trailerId: "AIS3", machineId: "AIS15295", reason: "newer name/history identifies Trailer 3 and its saved historical machine AIS15295 after older Trailer 34 provenance" },
  },
  AIS23487: {
    from: { trailerId: "AIS15", reason: "latest history says part was used in Trailer 15 and switched back out" },
  },
  AIS23502: {
    current: { trailerId: "AIS9", reason: "Healthview trailer resolves to the registered AIS9 Healthview trailer channel" },
  },
  AIS32601: {
    current: { trailerId: "AIS41", reason: "AIS41 upgrade kit sent from Lathrop" },
  },
  AIS35316: {
    current: { trailerId: "AIS36", reason: "item says for AIS36 and current machine/history are Trailer 36" },
  },
  AIS35839: {
    from: { trailerId: "AIS11", reason: "item name explicitly says from AIS11" },
  },
  AIS35948: {
    from: { trailerId: "AIS11", reason: "latest history shows it returned from Trailer 11 to the warehouse" },
    current: { decision: "no-active-trailer", reason: "latest history says unused at Trailer 11 and returned to Lake Forest" },
  },
  AIS36121: {
    from: { trailerId: "AIS27", reason: "core is identified to Trailer AIS27 and is now at the warehouse" },
  },
  AIS36480: {
    from: { trailerId: "AIS35", reason: "item name explicitly says from AIS35" },
  },
  AIS36519: {
    from: { trailerId: "AIS41", reason: "item name explicitly says from AIS41" },
  },
  AIS36897: {
    current: { trailerId: "AIS41", reason: "AIS41 upgrade kit sent from Lathrop" },
  },
  AIS36992: {
    from: { trailerId: "AIS41", reason: "bad AIS41 upgrade core returned from the trailer" },
  },
  AIS37324: {
    from: { trailerId: "AIS38", reason: "legacy from machine and description identify Trailer 38" },
  },
  AIS38632: {
    from: { trailerId: "AIS36", reason: "legacy from machine and work order identify Trailer 36" },
  },
  AIS60507: {
    current: { trailerId: "AIS38", reason: "current legacy machine is Trailer AIS38 AK 23x" },
  },
  AIS93366: {
    current: { trailerId: "AIS15", reason: "current legacy machine is Trailer AIS15" },
  },
  ...Object.fromEntries(
    [
      "AIS36601",
      "AIS36602",
      "AIS36603",
      "AIS36604",
      "AIS36605",
      "AIS36607",
      "AIS36608",
      "AIS36609",
      "AIS36610",
      "AIS36611",
      "AIS36612",
      "AIS36613",
      "AIS36614",
      "AIS36619",
      "AIS36621",
      "AIS36622",
      "AIS36661",
      "AIS36698",
      "AIS36699",
    ].map((id) => [
      id,
      {
        current: {
          trailerId: "AIS31",
          reason: "current client is AIS TRAILERS and current machine is the legacy Trailer AIS31 Achieva system",
        },
      },
    ])
  ),
};

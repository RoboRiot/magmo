const {
  clean,
  groupTrailerRecords,
  referenceId,
} = require("./trailerMigration.cjs");

function firstValue(sources, resolver) {
  for (const source of sources || []) {
    const value = resolver(source);
    if (value !== "" && value != null) return value;
  }
  return "";
}

function currentClientId(sources = []) {
  return firstValue(
    sources,
    (record) =>
      referenceId(record.currentClient) ||
      clean(record.currentClientId || record.locationCurrentId, 180)
  );
}

function associatedMachineId(sources = []) {
  return firstValue(
    sources,
    (record) =>
      referenceId(record.associatedMachine) ||
      clean(record.associatedMachineId, 180)
  );
}

function serializeTrailerDirectory(records = [], clients = []) {
  const clientById = new Map(
    (Array.isArray(clients) ? clients : []).map((client) => [
      clean(client?.id, 180),
      client,
    ])
  );
  return groupTrailerRecords(records)
    .filter((group) => group.canonicalId && !group.conflict)
    .map((group) => {
      const sources = group.sources;
      const primary = group.primary || sources[0] || {};
      const clientId = currentClientId(sources);
      const client = clientById.get(clientId) || null;
      const storedClientName = firstValue(
        sources,
        (record) =>
          clean(
            record.locationCurrentName ||
              record.currentClientName ||
              record.locationCurrent ||
              record.location,
            220
          )
      );
      const storedAddress = firstValue(sources, (record) =>
        clean(record.locationCurrentClientLocation, 500)
      );
      return {
        id: group.canonicalId,
        sourceId: clean(primary.id, 180),
        sourceIds: group.sourceIds,
        legacySourceIds: group.legacySourceIds,
        number: group.number,
        name:
          clean(primary.name || primary.mondayBoardName, 220) ||
          group.canonicalId,
        model: firstValue(sources, (record) => clean(record.model, 220)),
        vin: firstValue(sources, (record) => clean(record.vin, 220)),
        mondayBoardId: firstValue(sources, (record) =>
          clean(record.mondayBoardId, 180)
        ),
        mondayFolderName: firstValue(sources, (record) =>
          clean(record.mondayFolderName, 220)
        ),
        currentClientId: clientId,
        currentClientName: client
          ? clean(client?.name || client?.Name, 220)
          : "",
        currentClientAddress: client
          ? clean(
              client?.bluefolderFormattedAddress ||
                client?.blueFolderFormattedAddress ||
                client?.location ||
                client?.local,
              500
            )
          : "",
        legacyClientName: client ? "" : storedClientName,
        legacyClientAddress: client ? "" : storedAddress,
        associatedMachineId: associatedMachineId(sources),
        locationStatus: firstValue(sources, (record) =>
          clean(record.locationStatus || (record.inTransit ? "transit" : ""), 80)
        ),
        arrivalDate: firstValue(sources, (record) =>
          clean(record.locationCurrentArrivalDate, 80)
        ),
        departureDate: firstValue(sources, (record) =>
          clean(record.locationCurrentDepartureDate, 80)
        ),
        needsReview:
          !clientId ||
          group.legacySourceIds.length > 0 ||
          new Set(
            sources
              .map(
                (record) =>
                  referenceId(record.currentClient) ||
                  clean(record.currentClientId || record.locationCurrentId, 180)
              )
              .filter(Boolean)
          ).size > 1,
      };
    })
    .sort((left, right) => {
      if (left.number != null && right.number != null) {
        return left.number - right.number;
      }
      return left.name.localeCompare(right.name, "en", { numeric: true });
    });
}

module.exports = {
  associatedMachineId,
  currentClientId,
  serializeTrailerDirectory,
};

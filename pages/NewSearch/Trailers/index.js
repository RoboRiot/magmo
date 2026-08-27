import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Alert, Button, FormControl, Table } from "react-bootstrap";
import { adminDb } from "../../../context/FirebaseAdmin";
import trailerDirectoryHelpers from "../../../lib/ops/trailerDirectory.cjs";
import styles from "../../../styles/TrailerList.module.css";

const { serializeTrailerDirectory } = trailerDirectoryHelpers;
const SYNTHETIC_TRAILER_CLIENT_ID = "AIS62854";

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

export default function TrailerList({ initialTrailers = [], error = "" }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const trailers = Array.isArray(initialTrailers) ? initialTrailers : [];
  const filteredTrailers = useMemo(() => {
    const term = normalize(search);
    if (!term) return trailers;
    return trailers.filter((trailer) =>
      [
        trailer.id,
        trailer.name,
        trailer.model,
        trailer.vin,
        trailer.currentClientName,
        trailer.currentClientAddress,
        trailer.associatedMachineId,
        trailer.mondayFolderName,
      ]
        .map(normalize)
        .some((value) => value.includes(term))
    );
  }, [search, trailers]);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link
            href="/NewSearch/mainSearch"
            className={styles.brand}
            aria-label="Go to Main Search"
          >
            <img src="/magmo-logo.png" alt="Magmo" className={styles.brandLogo} />
            <div>
              <div className={styles.brandName}>Magmo</div>
              <div className={styles.brandSub}>Trailer Directory</div>
            </div>
          </Link>
          <Button
            variant="outline-secondary"
            className={styles.backButton}
            onClick={() => router.push("/Warehousedb/WarehouseSelect")}
          >
            Back to Warehouse DB
          </Button>
        </header>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Trailers</div>
              <div className={styles.cardSubtitle}>
                Trailer records are separate from clients. Each row shows its
                current Client DB connection and associated scanner.
              </div>
            </div>
            <div className={styles.cardBadge}>{filteredTrailers.length} trailers</div>
          </div>
          <div className={styles.cardBody}>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className={styles.searchRow}>
              <FormControl
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search trailer, client, address, model, or machine"
                aria-label="Search trailers"
                className={styles.searchInput}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setSearch("")}
                disabled={!search}
                className={styles.clearButton}
              >
                Clear
              </Button>
            </div>

            <Alert variant="info" className={styles.infoAlert}>
              “Needs review” means the current client is missing or this trailer
              still has legacy duplicate source records. Opening the trailer lets
              an admin select its real Client DB record.
            </Alert>

            <div className={styles.tableWrap}>
              <Table striped bordered hover responsive size="sm" className={styles.table}>
                <thead>
                  <tr>
                    <th>Trailer</th>
                    <th>Model</th>
                    <th>Current client</th>
                    <th>Client DB address</th>
                    <th>Associated machine</th>
                    <th>Status</th>
                    <th>Open</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrailers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className={styles.emptyState}>
                        No trailers match this search.
                      </td>
                    </tr>
                  ) : (
                    filteredTrailers.map((trailer) => (
                      <tr key={trailer.id}>
                        <td>
                          <div className={styles.trailerName}>{trailer.name}</div>
                          <div className={styles.muted}>{trailer.id}</div>
                        </td>
                        <td>{trailer.model || "—"}</td>
                        <td>
                          {trailer.currentClientId ? (
                            <Link href={`/NewSearch/client/${trailer.currentClientId}`}>
                              {trailer.currentClientName || trailer.currentClientId}
                            </Link>
                          ) : (
                            <span className={styles.missing}>Not linked</span>
                          )}
                        </td>
                        <td>{trailer.currentClientAddress || "—"}</td>
                        <td>{trailer.associatedMachineId || "—"}</td>
                        <td>
                          <span
                            className={
                              trailer.needsReview
                                ? styles.reviewBadge
                                : styles.linkedBadge
                            }
                          >
                            {trailer.needsReview ? "Needs review" : "Linked"}
                          </span>
                        </td>
                        <td>
                          <Link
                            className={styles.openButton}
                            href={{
                              pathname: `/NewSearch/Trailers/${encodeURIComponent(
                                trailer.sourceId || trailer.id
                              )}`,
                              query: { returnTo: "/NewSearch/Trailers" },
                            }}
                          >
                            Open
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  if (!adminDb) {
    return {
      props: {
        initialTrailers: [],
        error: "Firebase Admin is not configured for the trailer directory.",
      },
    };
  }
  try {
    const [trailerSnapshot, clientSnapshot] = await Promise.all([
      adminDb.collection("Trailers").get(),
      adminDb.collection("Client").get(),
    ]);
    const trailerRecords = trailerSnapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() || {}),
    }));
    const clients = clientSnapshot.docs
      .filter((document) => document.id !== SYNTHETIC_TRAILER_CLIENT_ID)
      .map((document) => ({ id: document.id, ...(document.data() || {}) }));
    return {
      props: {
        initialTrailers: serializeTrailerDirectory(trailerRecords, clients),
        error: "",
      },
    };
  } catch (loadError) {
    console.error("Failed to load trailer directory:", loadError);
    return {
      props: {
        initialTrailers: [],
        error: "Failed to load the trailer directory.",
      },
    };
  }
}

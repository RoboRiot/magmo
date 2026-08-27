import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import firebase from "../../context/Firebase";
import { useAuth } from "../../context/AuthUserContext";
import LoggedIn from "../LoggedIn";
import {
  ROLE_LABELS,
  USER_ROLES,
} from "../../utils/authAccess";
import styles from "../../styles/AdminSettings.module.css";

const ROLE_OPTIONS = [
  { value: USER_ROLES.ADMIN, label: ROLE_LABELS[USER_ROLES.ADMIN] },
  { value: USER_ROLES.USER, label: ROLE_LABELS[USER_ROLES.USER] },
  { value: USER_ROLES.VIEWER, label: ROLE_LABELS[USER_ROLES.VIEWER] },
];

const ROLE_HELP = [
  {
    role: "Master Admin",
    description: "Your protected owner account with access to these settings.",
  },
  {
    role: "Admin",
    description: "Managers with the app's existing administrative tools.",
  },
  {
    role: "User",
    description: "Employees with normal day-to-day Magmo access.",
  },
  {
    role: "Viewer",
    description: "Read-oriented access for approved outside guests.",
  },
];

async function authorizedRequest(url, options = {}) {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) throw new Error("Your sign-in session is no longer available.");
  const idToken = await currentUser.getIdToken();
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "The request could not be completed.");
  }
  return payload;
}

function withSavedValues(user) {
  return {
    ...user,
    savedDisplayName: user.displayName,
    savedRole: user.role,
  };
}

export default function AdminSettings() {
  const { authUser, refreshAuthUserClaims } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [directoryView, setDirectoryView] = useState("active");
  const [loading, setLoading] = useState(true);
  const [savingUid, setSavingUid] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const payload = await authorizedRequest("/api/admin/users");
      setUsers((payload.users || []).map(withSavedValues));
    } catch (loadError) {
      setError(loadError.message || "Users could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authUser?.isMasterAdmin) loadUsers();
  }, [authUser?.isMasterAdmin, loadUsers]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter(
      (user) =>
        user.disabled === (directoryView === "removed") &&
        (!query ||
          `${user.displayName} ${user.email} ${ROLE_LABELS[user.role] || user.role}`
            .toLowerCase()
            .includes(query))
    );
  }, [directoryView, search, users]);

  const updateField = (uid, field, value) => {
    setSuccess("");
    setUsers((current) =>
      current.map((user) =>
        user.uid === uid ? { ...user, [field]: value } : user
      )
    );
  };

  const saveUser = async (user) => {
    setSavingUid(user.uid);
    setError("");
    setSuccess("");
    try {
      const payload = await authorizedRequest("/api/admin/users", {
        method: "PATCH",
        body: JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          role: user.role,
        }),
      });
      const savedUser = withSavedValues(payload.user);
      setUsers((current) =>
        current.map((entry) => (entry.uid === savedUser.uid ? savedUser : entry))
      );
      if (savedUser.uid === authUser?.uid) {
        await refreshAuthUserClaims();
      }
      setSuccess(`${savedUser.displayName} was updated.`);
    } catch (saveError) {
      setError(saveError.message || "User settings could not be saved.");
    } finally {
      setSavingUid("");
    }
  };

  const changeUserAccess = async (user) => {
    const action = user.disabled ? "restore" : "remove";
    if (
      action === "remove" &&
      !window.confirm(
        `Remove ${user.displayName}'s Magmo access? They will be signed out and blocked from signing back in.`
      )
    ) {
      return;
    }

    setSavingUid(user.uid);
    setError("");
    setSuccess("");
    try {
      const payload = await authorizedRequest("/api/admin/users", {
        method: "PATCH",
        body: JSON.stringify({ uid: user.uid, action }),
      });
      const savedUser = withSavedValues(payload.user);
      setUsers((current) =>
        current.map((entry) => (entry.uid === savedUser.uid ? savedUser : entry))
      );
      setSuccess(
        action === "remove"
          ? `${savedUser.displayName}'s access was removed.`
          : `${savedUser.displayName}'s access was restored.`
      );
    } catch (accessError) {
      setError(accessError.message || "User access could not be changed.");
    } finally {
      setSavingUid("");
    }
  };

  return (
    <LoggedIn requiredRole={USER_ROLES.MASTER_ADMIN}>
      <Head>
        <title>Admin Settings | Magmo</title>
      </Head>
      <main className={styles.page}>
        <Container className={styles.container}>
          <div className={styles.header}>
            <div>
              <div className={styles.eyebrow}>Master Admin only</div>
              <h1>Admin Settings</h1>
              <p>
                Manage Magmo names, roles, and account access.
              </p>
            </div>
            <Link href="/Warehousedb/WarehouseSelect" className="btn btn-outline-secondary">
              Back to Warehouse
            </Link>
          </div>

          <Row className="g-3 mb-4">
            {ROLE_HELP.map((item) => (
              <Col key={item.role} xs={12} md={6} xl={3}>
                <Card className={styles.roleCard}>
                  <Card.Body>
                    <Card.Title>{item.role}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Alert variant="info" className={styles.viewerNote}>
            Outside viewers must try Google sign-in once so their account appears
            here. They remain blocked until you save them as Viewer. Role changes
            take effect on the person's next sign-in or token refresh. Removed
            accounts are signed out and stay blocked until you restore them.
          </Alert>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Card className={styles.directoryCard}>
            <Card.Body>
              <div className={styles.toolbar}>
                <div>
                  <h2>User directory</h2>
                  <span className={styles.userCount}>
                    {users.filter((user) => !user.disabled).length} active
                    {" / "}
                    {users.filter((user) => user.disabled).length} removed
                  </span>
                </div>
                <div className={styles.toolbarActions}>
                  <Form.Control
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search users"
                    aria-label="Search users"
                  />
                  <Button variant="outline-primary" onClick={loadUsers} disabled={loading}>
                    Refresh
                  </Button>
                </div>
              </div>

              <div className={styles.directoryTabs} role="tablist" aria-label="User status">
                <button
                  type="button"
                  role="tab"
                  aria-selected={directoryView === "active"}
                  className={`${styles.directoryTab} ${
                    directoryView === "active" ? styles.directoryTabActive : ""
                  }`}
                  onClick={() => {
                    setDirectoryView("active");
                    setSearch("");
                  }}
                >
                  Active Users
                  <span>{users.filter((user) => !user.disabled).length}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={directoryView === "removed"}
                  className={`${styles.directoryTab} ${
                    directoryView === "removed" ? styles.directoryTabActive : ""
                  }`}
                  onClick={() => {
                    setDirectoryView("removed");
                    setSearch("");
                  }}
                >
                  Removed Users
                  <span>{users.filter((user) => user.disabled).length}</span>
                </button>
              </div>

              {loading ? (
                <div className={styles.loadingState}>
                  <Spinner animation="border" role="status" />
                  <span>Loading users...</span>
                </div>
              ) : (
                <div className={styles.tableWrap}>
                  <Table responsive hover className={styles.userTable}>
                    <thead>
                      <tr>
                        <th>Name used in Magmo</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Last sign-in</th>
                        <th aria-label="Actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => {
                        const isDirty =
                          user.displayName !== user.savedDisplayName ||
                          user.role !== user.savedRole;
                        const isSaving = savingUid === user.uid;
                        const roleOptions = user.isMasterAdmin
                          ? [
                              {
                                value: USER_ROLES.MASTER_ADMIN,
                                label: ROLE_LABELS[USER_ROLES.MASTER_ADMIN],
                              },
                            ]
                          : user.isInternal
                          ? ROLE_OPTIONS
                          : ROLE_OPTIONS.filter(
                              (option) => option.value === USER_ROLES.VIEWER
                            );

                        return (
                          <tr
                            key={user.uid}
                            className={user.disabled ? styles.removedRow : undefined}
                          >
                            <td>
                              <Form.Control
                                value={user.displayName}
                                maxLength={80}
                                disabled={user.disabled}
                                onChange={(event) =>
                                  updateField(user.uid, "displayName", event.target.value)
                                }
                                aria-label={`Magmo name for ${user.email}`}
                              />
                              {user.disabled ? (
                                <Badge bg="danger" className="mt-2">
                                  Removed
                                </Badge>
                              ) : !user.accessApproved ? (
                                <Badge bg="warning" text="dark" className="mt-2">
                                  Pending approval
                                </Badge>
                              ) : null}
                            </td>
                            <td className={styles.emailCell}>{user.email || "No email"}</td>
                            <td>
                              <Form.Select
                                value={user.role}
                                disabled={user.isMasterAdmin || user.disabled}
                                onChange={(event) =>
                                  updateField(user.uid, "role", event.target.value)
                                }
                                aria-label={`Role for ${user.email}`}
                              >
                                {roleOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </Form.Select>
                              {user.isMasterAdmin && (
                                <small className={styles.protectedLabel}>Protected owner role</small>
                              )}
                            </td>
                            <td className={styles.dateCell}>
                              {user.lastSignInAt
                                ? new Date(user.lastSignInAt).toLocaleDateString()
                                : "Never"}
                            </td>
                            <td className={styles.actionCell}>
                              <div className={styles.actionButtons}>
                                <Button
                                  variant="primary"
                                  disabled={
                                    user.disabled ||
                                    !isDirty ||
                                    isSaving ||
                                    !user.displayName.trim()
                                  }
                                  onClick={() => saveUser(user)}
                                >
                                  {isSaving ? "Working..." : "Save"}
                                </Button>
                                {!user.isMasterAdmin && (
                                  <Button
                                    variant={user.disabled ? "outline-success" : "outline-danger"}
                                    disabled={isSaving}
                                    onClick={() => changeUserAccess(user)}
                                  >
                                    {user.disabled ? "Restore" : "Remove"}
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {!filteredUsers.length && (
                        <tr>
                          <td colSpan="5" className={styles.emptyState}>
                            {search.trim()
                              ? "No users match your search."
                              : directoryView === "removed"
                              ? "There are no removed users."
                              : "There are no active users."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </main>
    </LoggedIn>
  );
}

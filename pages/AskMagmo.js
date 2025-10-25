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
import Image from "next/image";
import { useAuth } from "../context/AuthUserContext";
import { useRouter } from "next/router";
import LoggedIn from "./LoggedIn";

export default function AskMagmo() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Chat log: [{ role: "user" | "assistant", text: string }]
  const [history, setHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);

  const scrollRef = useRef(null);

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
      { role: "assistant", text: "Thinking..." },
    ]);

    // clear input + set flag
    setQuestion("");
    setIsSending(true);

    try {
      // 2. Call our backend route with the question
      const res = await fetch("/api/gpt/AskMagmo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg }),
      });

      let answerText = "";
      if (res.ok) {
        const data = await res.json();
        answerText = data.answer || "(No answer returned)";
      } else {
        answerText = "Magmo couldn't get an answer from the manuals.";
      }

      // 3. Replace that "Thinking..." bubble with the real answer
      setHistory((prev) => {
        const updated = [...prev];
        // walk backward, find the last assistant "Thinking..."
        for (let i = updated.length - 1; i >= 0; i--) {
          if (
            updated[i].role === "assistant" &&
            updated[i].text === "Thinking..."
          ) {
            updated[i] = { role: "assistant", text: answerText };
            break;
          }
        }
        return updated;
      });
    } catch (err) {
      console.error("AskMagmo handleAsk error:", err);

      // If something blew up, replace "Thinking..." with an error message
      setHistory((prev) => {
        const updated = [...prev];
        for (let i = updated.length - 1; i >= 0; i--) {
          if (
            updated[i].role === "assistant" &&
            updated[i].text === "Thinking..."
          ) {
            updated[i] = {
              role: "assistant",
              text:
                "There was an issue reading the service docs. Try again in a moment.",
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
                    <Image
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
                      placeholder={`Example: "Table won't home on HDxt. What's step one?"`}
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
                          {msg.text}
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </LoggedIn>
  );
}

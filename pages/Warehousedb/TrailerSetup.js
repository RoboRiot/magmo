import React, { useMemo, useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Container, Form, ProgressBar } from "react-bootstrap";
import LoggedIn from "../LoggedIn";

const checklistSteps = {
  Arrival: [
    {
      title: "Trailer Number",
      prompt: "Enter the trailer number.",
      type: "text",
      placeholder: "Trailer number",
    },
    {
      title: "Exterior Photos",
      prompt: "Take or upload photos of the trailer exterior.",
      type: "file",
    },
    {
      title: "Condition Notes",
      prompt: "Add any arrival notes before continuing.",
      type: "textarea",
      placeholder: "Condition, seals, damage, or anything unusual",
    },
  ],
  Departure: [
    {
      title: "Trailer Number",
      prompt: "Enter the trailer number.",
      type: "text",
      placeholder: "Trailer number",
    },
    {
      title: "Load Photos",
      prompt: "Take or upload photos before the trailer leaves.",
      type: "file",
    },
    {
      title: "Departure Notes",
      prompt: "Add final departure notes.",
      type: "textarea",
      placeholder: "Load status, seal number, destination, or anything unusual",
    },
  ],
};

export default function TrailerSetup() {
  const [flowType, setFlowType] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const steps = useMemo(() => checklistSteps[flowType] || [], [flowType]);
  const currentStep = steps[stepIndex];
  const isComplete = flowType && stepIndex >= steps.length;
  const progress = steps.length ? Math.round((stepIndex / steps.length) * 100) : 0;

  const startFlow = (type) => {
    setFlowType(type);
    setStepIndex(0);
    setAnswers({});
  };

  const updateAnswer = (value) => {
    setAnswers((current) => ({
      ...current,
      [stepIndex]: value,
    }));
  };

  const nextStep = () => {
    setStepIndex((current) => current + 1);
  };

  const previousStep = () => {
    if (stepIndex === 0) {
      setFlowType("");
      return;
    }
    setStepIndex((current) => current - 1);
  };

  const resetFlow = () => {
    setFlowType("");
    setStepIndex(0);
    setAnswers({});
  };

  const renderStepInput = () => {
    if (!currentStep) return null;

    if (currentStep.type === "textarea") {
      return (
        <Form.Control
          as="textarea"
          rows={5}
          value={answers[stepIndex] || ""}
          placeholder={currentStep.placeholder}
          onChange={(event) => updateAnswer(event.target.value)}
        />
      );
    }

    if (currentStep.type === "file") {
      return (
        <Form.Control
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={(event) => updateAnswer(event.target.files?.length || 0)}
        />
      );
    }

    return (
      <Form.Control
        type="text"
        value={answers[stepIndex] || ""}
        placeholder={currentStep.placeholder}
        onChange={(event) => updateAnswer(event.target.value)}
      />
    );
  };

  return (
    <LoggedIn>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body className="w-100">
              <h2 className="text-center mb-4">Trailer Setup</h2>

              {!flowType && (
                <div className="d-grid gap-3">
                  <h5 className="text-center mb-1">Arrival or Departure?</h5>
                  <Button variant="primary" onClick={() => startFlow("Arrival")}>
                    Arrival
                  </Button>
                  <Button variant="secondary" onClick={() => startFlow("Departure")}>
                    Departure
                  </Button>
                  <Link href="/Warehousedb/WarehouseSelect" className="btn btn-secondary">
                    Back
                  </Link>
                </div>
              )}

              {flowType && !isComplete && currentStep && (
                <div className="d-grid gap-3">
                  <div>
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span>{flowType}</span>
                      <span>
                        Step {stepIndex + 1} of {steps.length}
                      </span>
                    </div>
                    <ProgressBar now={progress} />
                  </div>

                  <div>
                    <h5 className="mb-2">{currentStep.title}</h5>
                    <p className="text-muted mb-3">{currentStep.prompt}</p>
                    {renderStepInput()}
                  </div>

                  <Button variant="primary" onClick={nextStep}>
                    Submit
                  </Button>
                  <Button variant="secondary" onClick={previousStep}>
                    Back
                  </Button>
                </div>
              )}

              {isComplete && (
                <div className="d-grid gap-3 text-center">
                  <h5 className="mb-1">{flowType} checklist complete</h5>
                  <p className="text-muted mb-1">
                    The trailer setup flow is ready for saving these responses when
                    the final checklist fields are locked in.
                  </p>
                  <Button variant="primary" onClick={resetFlow}>
                    Start Another
                  </Button>
                  <Link href="/Warehousedb/WarehouseSelect" className="btn btn-secondary">
                    Back
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}

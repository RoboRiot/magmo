import React from 'react';
import { Container, Card, Row, Col, InputGroup, Dropdown, FormControl } from 'react-bootstrap';
import LoggedIn from '../LoggedIn';

export default function mainSearch() {
  return (
    <LoggedIn>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">New Search</h2>
              <Row>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Col md={4} className="mb-3">
                    <InputGroup>
                      <InputGroup.Text>{`Dropdown ${idx + 1}`}</InputGroup.Text>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="outline-secondary"
                          id={`dropdown-button-${idx + 1}`}
                          className="w-100"
                        >
                          Select Option
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                          <FormControl
                            autoFocus
                            className="mx-3 my-2 w-auto"
                            placeholder="Type to search"
                            onChange={(e) => console.log(e.target.value)}
                          />
                          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                          <Dropdown.Item eventKey="3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </InputGroup>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}

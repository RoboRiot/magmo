import React, { useRef, useState } from "react"
import { Form, Button, Card, Container, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthUserContext';
import { useRouter } from 'next/router';


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { createUserWithEmailAndPassword } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault()
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        try {
          setError("")
          setLoading(true)
          createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
          .then(authUser => {
            console.log("Success. The user is created in Firebase")
            router.push("/dashboard");
          })
          .catch(error => {
            // An error occurred. Set error message to be displayed to user
            setError(error.message)
          });
          
          
        } catch {
          setError("Failed to create an account")
        }
    
        setLoading(false)
      }

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button className="w-100 mt-3" type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Button variant="link" href="/">Login</Button>
                </div>
            </div>
        </Container>
    )
}

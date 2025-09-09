import React, { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Container } from 'react-bootstrap'
import styles from "../styles/Home.module.css"

import { useAuth } from '../context/AuthUserContext';
import LoggedIn from './LoggedIn'

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton(type, name, route) {
    

    const [isLoading, setLoading] = useState({ name: false });

    useEffect(() => {
        if (isLoading.name) {
            simulateNetworkRequest().then(() => {
                setLoading({ name: false });
            });
        }
    }, [isLoading.name]);

    const handleClick = () => setLoading({ name: true });

    return (
        <a
            class={"btn btn-" + type}
            variant={type}
            href={"/" + route}
            disabled={isLoading.name}
            onClick={!isLoading.name ? handleClick : null}
        >
            {isLoading.name ? 'Loading…' : name}
        </a>
    );
}

export default function dashboard() {
    const { signOut } = useAuth();
    return (
        <LoggedIn>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card className="align-items-center justify-content-center">
                        <Card.Body >
                            <h2 className="text-center mb-4">Logs</h2>
                            <div class="d-grid gap-3">

                                {LoadingButton("primary", "Info", "#")}

                                {LoadingButton("secondary", "All Notes", "#")}

                                {LoadingButton("primary", "Drive", "drive")}

                                <Button variant="link" onClick={signOut}>Sign out</Button>

                            </div>

                            

                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </LoggedIn>
    )
}
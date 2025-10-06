'use client';

import Link from "next/dist/client/link";
import React from "react";
import { Button, Card, Nav } from "react-bootstrap";

export default function BootstrapNavigation() {
    return (
        <>
            <div id="wd-css-navigating-with-pills" className="mb-4">
                <h2>Pills</h2>
                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link as={Link} href="/Labs">Labs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} href="/Labs/Lab1">Lab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} href="/Labs/Lab2">Lab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} href="/">Kambaz</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="https://github.com/ShamyaHaria/kambaz-next-js" target="_blank">
                            GitHub Repository
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div id="wd-css-navigating-with-tabs">
                <h2>Tabs</h2>
                <Nav variant="tabs">
                    <Nav.Item>
                        <Nav.Link href="#/Labs/Lab2/Active">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#/Labs/Lab2/Link1">Link 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#/Labs/Lab2/Link2">Link 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#/Labs/Lab2/Disabled" disabled>Disabled</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div id="wd-css-navigating-with-cards">
                <h2>
                    Cards
                </h2>
                <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="/images/stacked.jpg" alt="Stacked Starship rocket" />
                    <Card.Body>
                        <Card.Title>Stacking Starship</Card.Title>
                        <Card.Text>
                            Stacking the most powerful rocket in history. Mars or bust!
                        </Card.Text>
                        <Button variant="primary">Boldly Go</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
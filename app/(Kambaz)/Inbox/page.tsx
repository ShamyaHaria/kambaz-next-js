"use client";

import { Form, Button, InputGroup } from "react-bootstrap";
import { FaCog, FaSearch, FaUserFriends, FaReply, FaReplyAll, FaShare, FaTrash, FaEllipsisV, FaPlus } from "react-icons/fa";

export default function Inbox() {
    return (
        <div className="d-flex flex-column h-100 w-100 bg-white" style={{ minHeight: "100vh" }}>
            {/* Top bar */}
            <div className="d-flex align-items-center justify-content-between border-bottom p-3">
                <h2 className="m-0 fw-semibold">Inbox</h2>
                <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                        <FaCog /> Settings
                    </Button>
                    <Button variant="danger" size="sm" className="d-flex align-items-center gap-1">
                        <FaPlus /> Compose
                    </Button>
                </div>
            </div>

            {/* Filter row */}
            <div className="d-flex align-items-center gap-3 border-bottom px-3 py-2 bg-light">
                <Form.Select size="sm" style={{ maxWidth: 220 }}>
                    <option>All courses</option>
                </Form.Select>

                <Form.Select size="sm" style={{ maxWidth: 180 }}>
                    <option>Inbox</option>
                    <option>Unread</option>
                    <option>Starred</option>
                    <option>Sent</option>
                </Form.Select>

                <InputGroup size="sm" style={{ maxWidth: 380 }}>
                    <InputGroup.Text className="bg-white"><FaSearch /></InputGroup.Text>
                    <Form.Control type="text" placeholder="Search..." />
                </InputGroup>

                <Button variant="outline-secondary" size="sm">
                    <FaUserFriends />
                </Button>

                <div className="ms-auto d-flex align-items-center gap-1">
                    <Button variant="outline-secondary" size="sm"><FaReply /></Button>
                    <Button variant="outline-secondary" size="sm"><FaReplyAll /></Button>
                    <Button variant="outline-secondary" size="sm"><FaShare /></Button>
                    <Button variant="outline-secondary" size="sm"><FaTrash /></Button>
                    <Button variant="outline-secondary" size="sm"><FaEllipsisV /></Button>
                </div>
            </div>

            {/* Empty state */}
            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-muted">
                {/* You can replace this with an actual SVG/image later */}
                <div
                    className="rounded-circle border mb-3"
                    style={{ width: 90, height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <span style={{ fontSize: 40 }}>🐼</span>
                </div>
                <div className="fw-semibold">No Conversations to Show</div>
            </div>
        </div>
    );
}

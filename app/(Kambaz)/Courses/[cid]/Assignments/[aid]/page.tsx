'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Row, Col } from "react-bootstrap";
import * as db from '../../../../Database';
import { useParams } from "next/dist/client/components/navigation";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const router = useRouter();
    const assignmentFromDb = db.assignments.find((a: any) => a._id === aid);
    
    const [assignment, setAssignment] = useState(assignmentFromDb || {
        title: "A1",
        description: "New Assignment",
        points: 100,
        dueDate: "May 13",
        availableDate: "May 6"
    });

    const handleCancel = () => {
        router.push(`/Courses/${cid}/Assignments`);
    };

    const handleSave = () => {
        // For now, just navigate back (changes are lost on refresh, but user can edit during session)
        router.push(`/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="p-4">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                    <Form.Control 
                        id="wd-name" 
                        value={assignment.title}
                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-description">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        id="wd-description"
                        rows={8}
                        value={assignment.description}
                        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="wd-points">Points</Form.Label>
                        <Form.Control 
                            id="wd-points" 
                            type="number" 
                            value={assignment.points}
                            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
                        <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECTS">PROJECTS</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
                        <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
                            <option value="Percentage">Percentage</option>
                            <option value="Points">Points</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <div className="border rounded p-3 mb-3">
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
                            <Form.Select id="wd-submission-type" defaultValue="Online">
                                <option value="Online">Online</option>
                                <option value="In-Person">In-Person</option>
                                <option value="Paper">Paper</option>
                                <option value="External Tool">External Tool</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <div className="border rounded p-3">
                        <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                        <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
                        <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
                        <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                        <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
                        <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
                    </div>
                </div>

                <div className="border rounded p-3 mb-3">
                    <Form.Label className="fw-bold">Assign</Form.Label>
                    
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
                        <Form.Control id="wd-assign-to" defaultValue="Everyone" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                        <div className="position-relative">
                            <Form.Control 
                                id="wd-due-date" 
                                type="datetime-local" 
                                defaultValue={assignment ? `2024-${assignment.dueDate.replace(' ', '-')}T23:59` : "2024-05-13T23:59"} 
                            />
                        </div>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                                <div className="position-relative">
                                    <Form.Control 
                                        id="wd-available-from" 
                                        type="datetime-local" 
                                        defaultValue={assignment ? `2024-${assignment.availableDate.replace(' ', '-')}T12:00` : "2024-05-06T12:00"} 
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                                <div className="position-relative">
                                    <Form.Control 
                                        id="wd-available-until" 
                                        type="datetime-local" 
                                        defaultValue={assignment ? `2024-${assignment.dueDate.replace(' ', '-')}T23:59` : "2024-05-20T23:59"} 
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                <hr />

                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button variant="danger" onClick={handleSave}>Save</Button>
                </div>
            </Form>
        </div>
    );
}
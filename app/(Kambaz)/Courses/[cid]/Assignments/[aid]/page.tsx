'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useParams } from "next/navigation";
import { updateAssignment } from "../reducer";
export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const assignmentFromStore = assignments.find((a: any) => a._id === aid);
    const [assignment, setAssignment] = useState(assignmentFromStore || {
        _id: aid,
        title: "New Assignment",
        description: "New Description",
        points: 100,
        dueDate: "May 13",
        availableDate: "May 6",
        assignmentGroup: "ASSIGNMENTS",
        displayGradeAs: "Percentage",
        submissionType: "Online",
        onlineEntryOptions: {
            textEntry: false,
            websiteUrl: true,
            mediaRecordings: false,
            studentAnnotation: false,
            fileUploads: false
        }
    });
    const handleCancel = () => {
        router.push(`/Courses/${cid}/Assignments`);
    };
    const handleSave = () => {
        dispatch(updateAssignment(assignment));
        router.push(`/Courses/${cid}/Assignments`);
    };
    const formatDateForInput = (dateStr: string) => {
        if (!dateStr) return "";
        if (dateStr.includes("-")) return `2024-${dateStr}T23:59`;
        const months: any = {
            "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
            "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
            "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
        };
        const [month, day] = dateStr.split(" ");
        return `2024-${months[month]}-${day.padStart(2, '0')}T23:59`;
    };
    const extractDateString = (datetime: string) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(datetime);
        return `${months[date.getMonth()]} ${date.getDate()}`;
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
                        <Form.Select
                            id="wd-group"
                            value={assignment.assignmentGroup}
                            onChange={(e) => setAssignment({ ...assignment, assignmentGroup: e.target.value })}
                        >
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECTS">PROJECTS</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
                        <Form.Select
                            id="wd-display-grade-as"
                            value={assignment.displayGradeAs}
                            onChange={(e) => setAssignment({ ...assignment, displayGradeAs: e.target.value })}
                        >
                            <option value="Percentage">Percentage</option>
                            <option value="Points">Points</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <div className="border rounded p-3 mb-3">
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
                            <Form.Select
                                id="wd-submission-type"
                                value={assignment.submissionType}
                                onChange={(e) => setAssignment({ ...assignment, submissionType: e.target.value })}
                            >
                                <option value="Online">Online</option>
                                <option value="In-Person">In-Person</option>
                                <option value="Paper">Paper</option>
                                <option value="External Tool">External Tool</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <div className="border rounded p-3">
                        <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                        <Form.Check
                            type="checkbox"
                            id="wd-text-entry"
                            label="Text Entry"
                            checked={assignment.onlineEntryOptions?.textEntry || false}
                            onChange={(e) => setAssignment({
                                ...assignment,
                                onlineEntryOptions: { ...assignment.onlineEntryOptions, textEntry: e.target.checked }
                            })}
                        />
                        <Form.Check
                            type="checkbox"
                            id="wd-website-url"
                            label="Website URL"
                            checked={assignment.onlineEntryOptions?.websiteUrl || true}
                            onChange={(e) => setAssignment({
                                ...assignment,
                                onlineEntryOptions: { ...assignment.onlineEntryOptions, websiteUrl: e.target.checked }
                            })}
                        />
                        <Form.Check
                            type="checkbox"
                            id="wd-media-recordings"
                            label="Media Recordings"
                            checked={assignment.onlineEntryOptions?.mediaRecordings || false}
                            onChange={(e) => setAssignment({
                                ...assignment,
                                onlineEntryOptions: { ...assignment.onlineEntryOptions, mediaRecordings: e.target.checked }
                            })}
                        />
                        <Form.Check
                            type="checkbox"
                            id="wd-student-annotation"
                            label="Student Annotation"
                            checked={assignment.onlineEntryOptions?.studentAnnotation || false}
                            onChange={(e) => setAssignment({
                                ...assignment,
                                onlineEntryOptions: { ...assignment.onlineEntryOptions, studentAnnotation: e.target.checked }
                            })}
                        />
                        <Form.Check
                            type="checkbox"
                            id="wd-file-upload"
                            label="File Uploads"
                            checked={assignment.onlineEntryOptions?.fileUploads || false}
                            onChange={(e) => setAssignment({
                                ...assignment,
                                onlineEntryOptions: { ...assignment.onlineEntryOptions, fileUploads: e.target.checked }
                            })}
                        />
                    </div>
                </div>
                <div className="border rounded p-3 mb-3">
                    <Form.Label className="fw-bold">Assign</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
                        <Form.Control
                            id="wd-assign-to"
                            value={assignment.assignTo || "Everyone"}
                            onChange={(e) => setAssignment({ ...assignment, assignTo: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                        <div className="position-relative">
                            <Form.Control
                                id="wd-due-date"
                                type="datetime-local"
                                value={formatDateForInput(assignment.dueDate)}
                                onChange={(e) => setAssignment({ ...assignment, dueDate: extractDateString(e.target.value) })}
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
                                        value={formatDateForInput(assignment.availableDate)}
                                        onChange={(e) => setAssignment({ ...assignment, availableDate: extractDateString(e.target.value) })}
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
                                        value={formatDateForInput(assignment.dueDate)}
                                        onChange={(e) => setAssignment({ ...assignment, dueDate: extractDateString(e.target.value) })}
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
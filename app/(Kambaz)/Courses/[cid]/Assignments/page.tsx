'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { BsGripVertical } from 'react-icons/bs';
import { MdOutlineAssignment } from 'react-icons/md';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import { FaCheckCircle } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { setAssignments, addAssignment, deleteAssignment } from './reducer';
import * as client from '../../client';

export default function Assignments() {
    const params = useParams();
    const router = useRouter();
    const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const [assignmentName, setAssignmentName] = useState("");

    const isFacultyOrAdmin = currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN");

    const fetchAssignments = async () => {
        if (!cid) return;
        const assignments = await client.findAssignmentsForCourse(cid);
        dispatch(setAssignments(assignments));
    };

    useEffect(() => {
        fetchAssignments();
    }, [cid]);

    const onCreateAssignmentForCourse = async () => {
        if (!cid) return;
        const newAssignment = {
            title: assignmentName || "New Assignment",
            course: cid,
            description: "New Assignment",
            availableDate: "May 6",
            dueDate: "May 13",
            points: 100
        };
        const assignment = await client.createAssignmentForCourse(cid, newAssignment);
        dispatch(setAssignments([...assignments, assignment]));
        setAssignmentName("");
        router.push(`/Courses/${cid}/Assignments/${assignment._id}`);
    };

    const onRemoveAssignment = async (assignmentId: string) => {
        await client.deleteAssignment(assignmentId);
        const newAssignments = assignments.filter((a: any) => a._id !== assignmentId);
        dispatch(setAssignments(newAssignments));
    };

    return (
        <div id="wd-assignments">
            {isFacultyOrAdmin && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="input-group wd-search-bar">
                            <span className="input-group-text bg-white border-end-0">
                                <CiSearch />
                            </span>
                            <Form.Control
                                id="wd-search-assignment"
                                placeholder="Search..."
                                className="border-start-0"
                            />
                        </div>
                        <div>
                            <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
                                <FaPlus className="me-1" /> Group
                            </Button>
                            <Button variant="danger" id="wd-add-assignment" onClick={onCreateAssignmentForCourse}>
                                <FaPlus className="me-1" /> Assignment
                            </Button>
                        </div>
                    </div>
                </>
            )}

            <div className="wd-assignments-container">
                <div className="wd-assignments-header d-flex justify-content-between align-items-center p-3">
                    <div>
                        <BsGripVertical className="me-2 fs-3" />
                        <strong id="wd-assignments-title">ASSIGNMENTS</strong>
                    </div>
                    <div>
                        <span className="me-3">40% of Total</span>
                        {isFacultyOrAdmin && <FaPlus className="me-2" />}
                        <IoEllipsisVertical />
                    </div>
                </div>

                <ul className="list-group list-group-flush" id="wd-assignment-list">
                    {assignments.map((assignment: any) => (
                        <li key={assignment._id} className="wd-assignment-list-item list-group-item d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                            <MdOutlineAssignment className="me-3 fs-3 text-success" />
                            <div className="flex-grow-1">
                                <Link href={`/Courses/${cid}/Assignments/${assignment._id}`}
                                    className="wd-assignment-link text-decoration-none text-dark fw-bold">
                                    {assignment.title}
                                </Link>
                                <div className="wd-assignment-info">
                                    <span className="text-danger">{assignment.description}</span> |
                                    <strong> Not available until</strong> {assignment.availableDate} at 12:00am |
                                    <strong> Due</strong> {assignment.dueDate} at 11:59pm | {assignment.points} pts
                                </div>
                            </div>
                            {isFacultyOrAdmin && (
                                <FaTrash
                                    className="text-danger me-3"
                                    onClick={() => onRemoveAssignment(assignment._id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                            <FaCheckCircle className="text-success me-2" />
                            <IoEllipsisVertical />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
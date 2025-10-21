'use client';

import Link from 'next/link';
import { BsGripVertical } from 'react-icons/bs';
import { MdOutlineAssignment } from 'react-icons/md';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import { FaCheckCircle } from 'react-icons/fa';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as db from '../../../Database';
import { useParams } from 'next/dist/client/components/navigation';

export default function Assignments() {
    const { cid } = useParams();
    const assignmentsList = db.assignments.filter((assignment: any) => assignment.course === cid);
    return (
        <div id="wd-assignments">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <InputGroup className="wd-search-bar">
                    <InputGroup.Text className="bg-white border-end-0">
                        <CiSearch />
                    </InputGroup.Text>
                    <Form.Control
                        id="wd-search-assignment"
                        placeholder="Search..."
                        className="border-start-0"
                    />
                </InputGroup>
                <div>
                    <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
                        <FaPlus className="me-1" /> Group
                    </Button>
                    <Button variant="danger" id="wd-add-assignment">
                        <FaPlus className="me-1" /> Assignment
                    </Button>
                </div>
            </div>

            <div className="wd-assignments-container">
                <div className="wd-assignments-header d-flex justify-content-between align-items-center p-3">
                    <div>
                        <BsGripVertical className="me-2 fs-3" />
                        <strong id="wd-assignments-title">ASSIGNMENTS</strong>
                    </div>
                    <div>
                        <span className="me-3">40% of Total</span>
                        <FaPlus className="me-2" />
                        <IoEllipsisVertical />
                    </div>
                </div>

                <ul className="list-group list-group-flush" id="wd-assignment-list">
                    {assignmentsList.map((assignment: any) => (
                        <li key={assignment._id} className="wd-assignment-list-item list-group-item d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                            <MdOutlineAssignment className="me-3 fs-3 text-success" />
                            <div className="flex-grow-1">
                                <Link href={`/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link text-decoration-none text-dark fw-bold">
                                    {assignment.title}
                                </Link>
                                <div className="wd-assignment-info">
                                    <span className="text-danger">{assignment.description}</span> | <strong>Not available until</strong> {assignment.availableDate} at 12:00am | <strong>Due</strong> {assignment.dueDate} at 11:59pm | {assignment.points} pts
                                </div>
                            </div>
                            <FaCheckCircle className="text-success me-2" />
                            <IoEllipsisVertical />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
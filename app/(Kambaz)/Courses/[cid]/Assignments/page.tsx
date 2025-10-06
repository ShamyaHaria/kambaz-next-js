'use client';

import Link from 'next/link';
import { BsGripVertical } from 'react-icons/bs';
import { MdOutlineAssignment } from 'react-icons/md';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import { FaCheckCircle } from 'react-icons/fa';
import { Button, Form, InputGroup } from 'react-bootstrap';

export default function Assignments() {
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
                    <li className="wd-assignment-list-item list-group-item d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <MdOutlineAssignment className="me-3 fs-3 text-success" />
                        <div className="flex-grow-1">
                            <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none text-dark fw-bold">
                                A1
                            </Link>
                            <div className="wd-assignment-info">
                                <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
                            </div>
                        </div>
                        <FaCheckCircle className="text-success me-2" />
                        <IoEllipsisVertical />
                    </li>

                    <li className="wd-assignment-list-item list-group-item d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <MdOutlineAssignment className="me-3 fs-3 text-success" />
                        <div className="flex-grow-1">
                            <Link href="/Courses/1234/Assignments/124" className="wd-assignment-link text-decoration-none text-dark fw-bold">
                                A2
                            </Link>
                            <div className="wd-assignment-info">
                                <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts
                            </div>
                        </div>
                        <FaCheckCircle className="text-success me-2" />
                        <IoEllipsisVertical />
                    </li>

                    <li className="wd-assignment-list-item list-group-item d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <MdOutlineAssignment className="me-3 fs-3 text-success" />
                        <div className="flex-grow-1">
                            <Link href="/Courses/1234/Assignments/125" className="wd-assignment-link text-decoration-none text-dark fw-bold">
                                A3
                            </Link>
                            <div className="wd-assignment-info">
                                <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts
                            </div>
                        </div>
                        <FaCheckCircle className="text-success me-2" />
                        <IoEllipsisVertical />
                    </li>
                </ul>
            </div>
        </div>
    );
}
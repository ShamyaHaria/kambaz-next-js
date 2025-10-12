import './styles.css';
import { Button, Form } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function Piazza() {
    return (
        <div id="wd-piazza-main">
            <div className="wd-piazza-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="text-white mb-0">piazza</h2>
                    <div className="d-flex gap-3 align-items-center text-white">
                        <span>CS 5010.MERGED.202610</span>
                        <span>Q & A</span>
                        <span>Resources</span>
                        <span>Statistics</span>
                        <span>Employers</span>
                        <span>Shamya Mitesh Haria</span>
                    </div>
                </div>
            </div>

            <div className="d-flex">
                <div className="wd-piazza-sidebar">
                    <Button variant="primary" className="w-100 mb-3">
                        <FaPlus className="me-2" /> New Post
                    </Button>
                    
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaSearch /></span>
                        <Form.Control placeholder="Search posts..." />
                    </div>

                    <div className="wd-piazza-filters mb-3">
                        <div className="mb-2">hw1 <span className="badge bg-secondary">15</span></div>
                        <div className="mb-2">hw2 <span className="badge bg-secondary">68</span></div>
                        <div className="mb-2">hw3 <span className="badge bg-secondary">20</span></div>
                        <div className="mb-2">hw4</div>
                        <div className="mb-2">hw5</div>
                        <div className="mb-2">hw6</div>
                        <div className="mb-2">hw7</div>
                        <div className="mb-2">labs <span className="badge bg-secondary">27</span></div>
                        <div className="mb-2">code_walks <span className="badge bg-secondary">1</span></div>
                        <div className="mb-2">logistics <span className="badge bg-secondary">12</span></div>
                    </div>

                    <div className="border-top pt-3">
                        <h6>All Posts</h6>
                        <div className="wd-pinned-section mb-3">
                            <strong>Pinned</strong>
                            <div className="wd-post-item mt-2">
                                <div className="fw-bold">Lab 5 and Assignment 3 minor...</div>
                                <small className="text-muted">10/9/25</small>
                                <p className="small mb-0">Hello All, For Lab 5, the bst lab, you do not need to copy the exception file...</p>
                            </div>
                            <div className="wd-post-item mt-2">
                                <div className="fw-bold">Assignment 3 Zip File Clarific...</div>
                                <small className="text-muted">10/7/25</small>
                                <p className="small mb-0">Hello All, The README of the handout repo has a line that asks you to submit a zip file...</p>
                            </div>
                        </div>

                        <div className="wd-today-section">
                            <strong>Today</strong>
                            <div className="wd-post-item mt-2">
                                <div className="fw-bold">Pit test failing to build</div>
                                <small className="text-muted">04:09 PM</small>
                                <p className="small mb-0">My pit test is reporting that execution failed...</p>
                            </div>
                            <div className="wd-post-item mt-2">
                                <div className="fw-bold">Late tokens</div>
                                <small className="text-muted">03:57 PM</small>
                                <p className="small mb-0">Hello! Will the late tokens from individual assignments...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wd-piazza-content flex-grow-1 p-4">
                    <h3>Class at a Glance</h3>
                    
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="alert alert-warning">
                                <strong>⚠ Needs Attention</strong>
                                <div>93 unread posts</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="alert alert-warning">
                                <strong>⚠ Needs Attention</strong>
                                <div>5 unanswered questions</div>
                            </div>
                        </div>
                    </div>

                    <div className="alert alert-warning mb-4">
                        <strong>⚠ Needs Attention</strong>
                        <div>62 unanswered followups</div>
                    </div>

                    <div className="row text-center mb-4">
                        <div className="col-md-6 mb-3">
                            <div className="border p-3 rounded">
                                <h2 className="display-4">378</h2>
                                <p>Total Posts</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="border p-3 rounded">
                                <h2 className="display-4">1245</h2>
                                <p>Total Contributions</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="border p-3 rounded">
                                <h2 className="display-4">359</h2>
                                <p>Students Enrolled</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="border p-3 rounded">
                                <h6>License Status</h6>
                                <p className="mb-0">active instructor license</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="border p-3 rounded">
                                <h2 className="display-4">355</h2>
                                <p>Instructor Engagement<br/>instructor responses</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="border p-3 rounded">
                                <h2 className="display-4">45</h2>
                                <p>Student Participation<br/>student responses</p>
                            </div>
                        </div>
                    </div>

                    <div className="alert alert-light">
                        <h5>Hey Students!</h5>
                        <p>We are excited to have launched the revamped user interface for Piazza! You asked, and we listened – our team has been hard at work developing a modern user interface while...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
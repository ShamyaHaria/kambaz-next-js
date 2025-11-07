"use client"
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as db from "../Database";
import { Card, CardBody, CardImg, CardText, CardTitle, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/[cid]/reducer";

export default function Dashboard() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = db;
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const dispatch = useDispatch();
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description"
    });
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h5>New Course
                <button
                    className="btn btn-primary float-end"
                    onClick={() => dispatch(addNewCourse(course))} > Add
                </button>
                <Button className="float-end me-2"
                    onClick={() => dispatch(updateCourse(course))}>
                    Update
                </Button>
            </h5>
            <br />
            <input value={course.name}
                className="form-control mb-2"
                onChange={(e) => setCourse(
                    { ...course, name: e.target.value })} />
            <textarea value={course.description}
                className="form-control"
                onChange={(e) => setCourse(
                    { ...course, description: e.target.value })} />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses .filter(
                        (course:any) => enrollments.some(
                            (enrollment) => enrollment.user === currentUser._id
                            && enrollment.course === course._id )) .map((course: any) => (
                    <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href={`/Courses/${course._id}/Home`}
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160} />
                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{course.name}</CardTitle>
                                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        {course.description} </CardText>
                                    <Button variant="primary">Go</Button>
                                    <Button onClick={(event) => {
                                        event.preventDefault();
                                        dispatch(deleteCourse(course._id));
                                    }} className="float-end" > Delete
                                    </Button>
                                    <Button id="wd-edit-course-click"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setCourse(course);
                                        }}
                                        className="me-2 float-end" >
                                        Edit
                                    </Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
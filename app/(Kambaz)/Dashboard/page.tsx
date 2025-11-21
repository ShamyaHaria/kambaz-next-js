"use client"
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardBody, CardImg, CardText, CardTitle, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { addEnrollment, setEnrollments, removeEnrollment } from "../enrollmentsReducer";
import * as coursesClient from "../Courses/client";

export default function Dashboard() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const dispatch = useDispatch();
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description"
    });
    const [showAllCourses, setShowAllCourses] = useState(false);

    const fetchCourses = async () => {
        try {
            let courses;
            if (currentUser && !showAllCourses) {
                courses = await coursesClient.findMyCourses();
            } else {
                courses = await coursesClient.fetchAllCourses();
            }
            dispatch(setCourses(courses));
        } catch (error) {
            console.error(error);
            try {
                const allCourses = await coursesClient.fetchAllCourses();
                dispatch(setCourses(allCourses));
            } catch (e) {
                console.error("Failed to fetch courses:", e);
            }
        }
    };

    const fetchEnrollments = async () => {
        try {
            const enrollments = await coursesClient.fetchEnrollments();
            dispatch(setEnrollments(enrollments));
        } catch (error) {
            console.error("Error fetching enrollments:", error);
        }
    };

    const onAddNewCourse = async () => {
        const newCourse = await coursesClient.createCourse(course);
        dispatch(setCourses([...courses, newCourse]));
        if (currentUser) {
            const updatedEnrollments = await coursesClient.fetchEnrollments();
            dispatch(setEnrollments(updatedEnrollments));
        }
    };

    const onDeleteCourse = async (courseId: string) => {
        await coursesClient.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((course: any) =>
            course._id !== courseId)));
    };

    const onUpdateCourse = async () => {
        await coursesClient.updateCourse(course);
        dispatch(setCourses(courses.map((c: any) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        })));
    };

    const onEnroll = async (courseId: string) => {
        try {
            const enrollment = await coursesClient.enrollInCourse(courseId);
            dispatch(addEnrollment(enrollment));
            if (!showAllCourses && currentUser) {
                const allCourses = await coursesClient.fetchAllCourses();
                const enrolledCourse = allCourses.find((c: any) => c._id === courseId);
                if (enrolledCourse) {
                    dispatch(setCourses([...courses, enrolledCourse]));
                }
            }
        } catch (error) {
            console.error("Error enrolling:", error);
        }
    };

    const onUnenroll = async (courseId: string) => {
        try {
            await coursesClient.unenrollFromCourse(courseId);
            dispatch(setEnrollments(enrollments.filter((e: any) =>
                !(e.user === currentUser._id && e.course === courseId)
            )));
            if (!showAllCourses && currentUser) {
                dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
            }
        } catch (error) {
            console.error("Error unenrolling:", error);
        }
    };

    const isEnrolled = (courseId: string) => {
        if (!currentUser) return false;
        return enrollments.some((e: any) =>
            e.user === currentUser._id && e.course === courseId
        );
    };

    useEffect(() => {
        fetchCourses();
        if (currentUser) {
            fetchEnrollments();
        }
    }, [currentUser, showAllCourses]);

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

            {currentUser && (
                <>
                    <Button
                        variant={showAllCourses ? "primary" : "secondary"}
                        onClick={() => setShowAllCourses(!showAllCourses)}
                        className="mb-3"
                    >
                        {showAllCourses ? "Show My Courses" : "Show All Courses"}
                    </Button>

                    <h5>New Course
                        <button
                            className="btn btn-primary float-end"
                            onClick={onAddNewCourse}>
                            Add
                        </button>
                        <Button className="float-end me-2"
                            onClick={onUpdateCourse}>
                            Update
                        </Button>
                    </h5>
                    <br />
                    <input value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description}
                        className="form-control mb-3"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                </>
            )}

            <h2 id="wd-dashboard-published">
                {currentUser && !showAllCourses ? "Enrolled Courses" : "All Courses"} ({courses.length})
            </h2>
            <hr />

            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course: any) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Link href={`/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160} />
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {course.name}
                                        </CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            {course.description}
                                        </CardText>
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <Button variant="primary">Go</Button>
                                            {currentUser && (
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        id="wd-edit-course-click"
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}>Edit
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            onDeleteCourse(course._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                    {isEnrolled(course._id) ? (
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                onUnenroll(course._id);
                                                            }}>Unenroll
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                onEnroll(course._id);
                                                            }}>Enroll
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
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
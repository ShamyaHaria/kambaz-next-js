"use client";

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import CourseNavigation from "./Navigation";
import { GiHamburgerMenu } from "react-icons/gi";

export default function CoursesLayout({ children }: { children: ReactNode }) {
    const { cid } = useParams();
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const course = courses.find((course: any) => course._id === cid);
    
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <GiHamburgerMenu className="me-4 fs-4 mb-1" />
                {course?.name}
            </h2>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    {children}
                </div>
            </div>
        </div>
    );
}
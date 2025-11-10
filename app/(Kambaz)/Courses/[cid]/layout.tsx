"use client";

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useParams, usePathname } from "next/navigation";
import CourseNavigation from "./Navigation";
import { GiHamburgerMenu } from "react-icons/gi";

export default function CoursesLayout({ children }: { children: ReactNode }) {
    const { cid } = useParams();
    const pathname = usePathname();
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const course = courses.find((course: any) => course._id === cid);

    const paths = pathname.split("/");
    let currentSection = paths[paths.length - 1];
    if (currentSection === "Table") {
        currentSection = "People";
    }

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <GiHamburgerMenu className="me-4 fs-4 mb-1" />
                {course?.name} &gt; {currentSection}
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
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { courses } from "../../Database";
import BreadcrumbComponent from "./BreadcrumbComponent";

export default async function CoursesLayout(
    { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
    const { cid } = await params;
    const course = courses.find((course) => course._id === cid);
    
    return (
        <div id="wd-courses">
            <BreadcrumbComponent cid={cid} courseName={course?.name || ""} />
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
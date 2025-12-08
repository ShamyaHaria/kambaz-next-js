"use client";

import { useSelector } from "react-redux";
import Modules from "../Modules/page";
import CourseStatus from "./status";

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFacultyOrAdmin =
    currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN");

  return (
    <div id="wd-courses">
      <div className="d-flex" id="wd-home">
        <div className="flex-fill me-3">
          <Modules />
        </div>

        {/* Course Status only for faculty/admin */}
        {isFacultyOrAdmin && (
          <div className="d-none d-xl-block">
            <CourseStatus />
          </div>
        )}
      </div>
    </div>
  );
}

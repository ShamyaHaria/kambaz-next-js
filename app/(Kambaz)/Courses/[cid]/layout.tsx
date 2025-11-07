"use client";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
export default async function CoursesLayout({ children }
: { children: ReactNode }) {
 const { cid } = useParams();
 const { courses } = useSelector(
       (state: any) => state.coursesReducer);
 const course = courses.find(
       (course: any) => course._id === cid);
 return (
   <div id="wd-courses">
     <h2>{course.name}</h2>
   </div>
);}

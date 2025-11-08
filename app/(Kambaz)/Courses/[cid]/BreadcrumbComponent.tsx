"use client";

import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";

export default function BreadcrumbComponent({ cid, courseName }: { cid: string; courseName: string }) {
    const pathname = usePathname();
    const paths = pathname.split("/");
    let currentSection = paths[paths.length - 1];
    
    if (currentSection === "Table") {
        currentSection = paths[paths.length - 2];
    }
    
    return (
        <h2 className="text-danger">
            <GiHamburgerMenu className="me-4 fs-4 mb-1" />
            {courseName} &gt; {currentSection}
        </h2>
    );
}
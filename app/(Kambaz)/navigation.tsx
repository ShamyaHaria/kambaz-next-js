"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaBookBookmark } from "react-icons/fa6";
import { SiAndroidstudio } from "react-icons/si";
import { IoMdHelpCircle } from "react-icons/io";
import { GiMaterialsScience } from "react-icons/gi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
    const pathname = usePathname();
    const links = [
        { href: "/Account", label: "Account", icon: FaRegCircleUser },
        { href: "/Dashboard", label: "Dashboard", icon: AiOutlineDashboard },
        { href: "/Courses", label: "Courses", icon: FaBookBookmark },
        { href: "/Calendar", label: "Calendar", icon: IoCalendarOutline },
        { href: "/Inbox", label: "Inbox", icon: FaInbox },
        { href: "/History", label: "History", icon: FaHistory },
        { href: "/Studio", label: "Studio", icon: SiAndroidstudio },
        { href: "/Help", label: "Help", icon: IoMdHelpCircle },
        { href: "/Labs", label: "Labs", icon: GiMaterialsScience }
    ];

    return (
        <ListGroup id="wd-kambaz-navigation" style={{ width: 120 }}
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
            <ListGroupItem className="bg-black border-0 text-center " as="a"
                target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
                <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
            </ListGroupItem>
            {links.map(({ href, label, icon: Icon }) => (
                <ListGroupItem key={href} as={Link} href={href}
                    className={`${pathname.includes(label) ? "bg-white text-danger"
                        : "bg-black text-white"} text-center border-0`} >
                    <Icon className="fs-1 text-danger" /> <br />
                    {label}
                </ListGroupItem>
            ))}

        </ListGroup>
    );
}
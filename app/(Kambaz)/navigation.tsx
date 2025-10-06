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

export default function KambazNavigation() {
    return (
        <ListGroup id="wd-kambaz-navigation" style={{ width: 120 }} 
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
            <ListGroupItem className="bg-black border-0 text-center " as="a"
                target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
                <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-white text-center">
                <Link href="/Account" id="wd-account-link" className="text-danger text-decoration-none">
                    <FaRegCircleUser className="fs-3 text-danger" />
                    <br />
                    Account
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Dashboard" id="wd-dashboard-link" className="text-white text-decoration-none">
                    <AiOutlineDashboard className="fs-3 text-danger" />
                    <br />
                    Dashboard
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Courses" id="wd-courses-link" className="text-white text-decoration-none">
                    <FaBookBookmark className="fs-3 text-danger" />
                    <br />
                    Courses
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Calendar" id="wd-calendar-link" className="text-white text-decoration-none">
                    <IoCalendarOutline className="fs-3 text-danger" />
                    <br />
                    Calendar
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Inbox" id="wd-inbox-link" className="text-white text-decoration-none">
                    <FaInbox className="fs-3 text-danger" />
                    <br />
                    Inbox
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/History" id="wd-history-link" className="text-white text-decoration-none">
                    <FaHistory className="fs-3 text-danger" />
                    <br />
                    History
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Studio" id="wd-studio-link" className="text-white text-decoration-none">
                    <SiAndroidstudio className="fs-3 text-danger" />
                    <br />
                    Studio
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Help" id="wd-help-link" className="text-white text-decoration-none">
                    <IoMdHelpCircle className="fs-3 text-danger" />
                    <br />
                    Help
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Labs" id="wd-labs-link" className="text-white text-decoration-none">
                    <GiMaterialsScience className="fs-3 text-danger" />
                    <br />
                    Labs
                </Link>
            </ListGroupItem>
        </ListGroup>
    );
}

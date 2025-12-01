"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    const { currentUser } = useSelector(
        (state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] :
        ["Signin", "Signup"];
    const pathname = usePathname();

    return (
        <Nav variant="pills">
            {currentUser && currentUser.role === "ADMIN" && (
                <NavLink as={Link} href={`/Account/Users`} active={pathname.endsWith('Users')}> Users </NavLink>)}
            <Link
                href="/Account/Signin"
                className={`wd-account-nav-link ${pathname.endsWith("/Signin") ? "wd-signin-active" : ""}`}>
                Signin
            </Link>
            <Link
                href="/Account/Signup"
                className={`wd-account-nav-link ${pathname.endsWith("/Signup") ? "wd-signin-active" : ""}`}>
                Signup
            </Link>
            <Link
                href="/Account/Profile"
                className={`wd-account-nav-link ${pathname.endsWith("/Profile") ? "wd-signin-active" : ""}`}>
                Profile
            </Link>
        </Nav>
    );
}
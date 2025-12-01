"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const pathname = usePathname();

    return (
        <Nav variant="pills" className="flex-column">
            {currentUser && currentUser.role === "ADMIN" && (
                <Nav.Link
                    as={Link}
                    href="/Account/Users"
                    active={pathname.includes('Users')}>
                    Users
                </Nav.Link>
            )}

            {!currentUser && (
                <>
                    <Nav.Link
                        as={Link}
                        href="/Account/Signin"
                        active={pathname.includes("Signin")}>
                        Signin
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        href="/Account/Signup"
                        active={pathname.includes("Signup")}>
                        Signup
                    </Nav.Link>
                </>
            )}

            {currentUser && (
                <Nav.Link
                    as={Link}
                    href="/Account/Profile"
                    active={pathname.includes("Profile")}>
                    Profile
                </Nav.Link>
            )}
        </Nav>
    );
}
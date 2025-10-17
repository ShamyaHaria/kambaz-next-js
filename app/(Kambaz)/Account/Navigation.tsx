"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles.css";

export default function AccountNavigation() {
    const pathname = usePathname();

    return (
        <div className="wd-account-nav">
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
        </div>
    );
}
import Link from "next/link";

export default function AccountNavigation() {
    return (
        <div className="wd-account-nav">
            <Link href="/Account/Signin" className="wd-account-nav-link wd-signin-active">
                Signin
            </Link>
            <Link href="/Account/Signup" className="wd-account-nav-link">
                Signup
            </Link>
            <Link href="/Account/Profile" className="wd-account-nav-link">
                Profile
            </Link>
        </div>
    );
}
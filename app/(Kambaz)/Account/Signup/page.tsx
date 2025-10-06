import Link from "next/link";
import { Form } from "react-bootstrap";

export default function Signup() {
    return (
        <div id="wd-signup-screen" className="wd-account-form">
            <h3>Sign up</h3>
            <Form.Control placeholder="username" className="wd-username mb-2" />
            <Form.Control placeholder="password" type="password" className="wd-password mb-2" />
            <Form.Control placeholder="verify password" type="password" className="wd-password-verify mb-2" />
            <Link href="/Dashboard" className="btn btn-primary w-100 mb-2">Sign up</Link>
            <Link href="/Account/Signin">Sign in</Link>
        </div>
    );
}
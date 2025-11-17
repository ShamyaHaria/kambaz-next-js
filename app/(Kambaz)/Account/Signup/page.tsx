"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
    const [user, setUser] = useState<any>({});
    const dispatch = useDispatch();
    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        redirect("/Account/Profile");
    };

    return (
        <div className="wd-signup-screen">
            <h1>Sign up</h1>
            <FormControl value={user.username}
                onChange={(e) => setUser({
                    ...user,
                    username: e.target.value
                })} />
            <FormControl value={user.password} type="password"
                onChange={(e) => setUser({
                    ...user,
                    password: e.target.value
                })} />
            <button onClick={signup}> Sign up </button><br />
            <Link href="/Account/Signin">Sign in</Link>
        </div>
    );
}

"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
    const [user, setUser] = useState<any>({});
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        if (currentUser) {
            redirect("/Account/Profile");
        }
    }, [currentUser]);

    const signup = async () => {
        const newUser = await client.signup(user);
        dispatch(setCurrentUser(newUser));
        redirect("/Account/Profile");
    };

    if (currentUser) {
        return null;
    }

    return (
        <div className="wd-signup-screen">
            <h1>Sign up</h1>
            <FormControl
                value={user.username || ""}
                onChange={(e) => setUser({
                    ...user,
                    username: e.target.value
                })}
                className="mb-2"
                placeholder="username"
            />
            <FormControl
                value={user.password || ""}
                type="password"
                onChange={(e) => setUser({
                    ...user,
                    password: e.target.value
                })}
                className="mb-2"
                placeholder="password"
            />
            <Button onClick={signup} className="w-100 mb-2">
                Sign up
            </Button>
        </div>
    );
}
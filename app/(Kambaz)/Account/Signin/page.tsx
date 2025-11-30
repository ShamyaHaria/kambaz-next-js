"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as client from "../client";
import { FormControl, Button, Form } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    if (currentUser) {
      redirect("/Account/Profile");
    }
  }, [currentUser]);

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  if (currentUser) {
    return null;
  }

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        value={credentials.username || ""}
        onChange={(e) => setCredentials({
          ...credentials, username: e.target.value
        })}
        className="mb-2"
        placeholder="username"
      />
      <FormControl
        value={credentials.password || ""}
        onChange={(e) => setCredentials({
          ...credentials, password: e.target.value
        })}
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/Kambaz/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
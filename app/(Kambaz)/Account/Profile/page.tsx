"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import Link from "next/link";
import { Button, Form, FormControl } from "react-bootstrap";

export default function Profile() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const signout = () => {
        dispatch(setCurrentUser(null));
        redirect("/Account/Signin");
    };
    const fetchProfile = () => {
        if (!currentUser)
            return redirect("/Account/Signin");
        setProfile(currentUser);
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div id="wd-profile-screen" className="wd-account-form">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <FormControl id="wd-username" className="mb-2"
                        defaultValue={profile.username}
                        onChange={(e) => setProfile({
                            ...profile, username: e.target.value
                        })} />
                    <FormControl id="wd-password" className="mb-2"
                        defaultValue={profile.password}
                        onChange={(e) => setProfile({
                            ...profile, password: e.target.value
                        })} />
                    <FormControl id="wd-firstname" className="mb-2"
                        defaultValue={profile.firstName}
                        onChange={(e) => setProfile({
                            ...profile, firstName: e.target.value
                        })} />
                    <FormControl id="wd-lastname" className="mb-2"
                        defaultValue={profile.lastName}
                        onChange={(e) => setProfile({
                            ...profile, lastName: e.target.value
                        })} />
                    <FormControl id="wd-dob" className="mb-2" type="date"
                        defaultValue={profile.dob}
                        onChange={(e) => setProfile({
                            ...profile, dob: e.target.value
                        })} />
                    <FormControl id="wd-email" className="mb-2"
                        defaultValue={profile.email}
                        onChange={(e) => setProfile({
                            ...profile, email: e.target.value
                        })} />
                    <select className="form-control mb-2" id="wd-role"
                        onChange={(e) => setProfile({
                            ...profile, role: e.target.value
                        })} >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>{" "}
                        <option value="STUDENT">Student</option>
                    </select>
                    <Button onClick={() =>
                        dispatch(setCurrentUser(profile))}> Save
                    </Button>
                </div>
            )}
        </div>
    );
}
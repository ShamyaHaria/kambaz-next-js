"use client";
import * as client from "../client";
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

    const signout = async () => {
        await client.signout();
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

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    const formatDateForInput = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div id="wd-profile-screen" className="wd-account-form">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <FormControl
                            id="wd-username"
                            placeholder="Enter username"
                            value={profile.username || ''}
                            onChange={(e) => setProfile({
                                ...profile, username: e.target.value
                            })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <FormControl
                            id="wd-password"
                            type="password"
                            placeholder="Enter password"
                            value={profile.password || ''}
                            onChange={(e) => setProfile({
                                ...profile, password: e.target.value
                            })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <FormControl
                            id="wd-firstname"
                            placeholder="Enter first name"
                            value={profile.firstName || ''}
                            onChange={(e) => setProfile({
                                ...profile, firstName: e.target.value
                            })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <FormControl
                            id="wd-lastname"
                            placeholder="Enter last name"
                            value={profile.lastName || ''}
                            onChange={(e) => setProfile({
                                ...profile, lastName: e.target.value
                            })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <FormControl
                            id="wd-email"
                            type="email"
                            placeholder="Enter email"
                            value={profile.email || ''}
                            onChange={(e) => setProfile({
                                ...profile, email: e.target.value
                            })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <FormControl
                            id="wd-dob"
                            type="date"
                            value={formatDateForInput(profile.dob)}
                            onChange={(e) => setProfile({
                                ...profile, dob: e.target.value
                            })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            id="wd-role"
                            value={profile.role || 'STUDENT'}
                            onChange={(e) => setProfile({
                                ...profile, role: e.target.value
                            })}
                        >
                            <option value="STUDENT">Student</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="ADMIN">Admin</option>
                        </Form.Select>
                    </Form.Group>

                    <Button onClick={updateProfile} className="w-100 mb-2" variant="primary">
                        Update
                    </Button>
                    <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn" variant="danger">
                        Sign out
                    </Button>
                </div>
            )}
        </div>
    );
}
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import PeopleDetails from "./Details";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function PeopleTable({ fetchUsers }: { fetchUsers: () => void; }) {
    const params = useParams();
    const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
    const [showDetails, setShowDetails] = useState(false);
    const [showUserId, setShowUserId] = useState<string | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, enrollmentsResponse] = await Promise.all([
                    axios.get(`${HTTP_SERVER}/api/users`),
                    axios.get(`${HTTP_SERVER}/api/enrollments`)
                ]);

                const allUsers = usersResponse.data;
                const enrollments = enrollmentsResponse.data;

                // Filter users enrolled in this course
                const enrolledUsers = allUsers.filter((user: any) =>
                    enrollments.some((enrollment: any) =>
                        enrollment.user === user._id && enrollment.course === cid
                    )
                );

                setUsers(enrolledUsers);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="wd-people-table">
            {showDetails && (
                <PeopleDetails
                    uid={showUserId}
                    onClose={() => {
                        setShowDetails(false);
                        fetchUsers();
                    }} />
            )}

            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td className="wd-full-name text-nowrap">
                                <span className="text-decoration-none cursor-pointer"
                                    onClick={() => {
                                        setShowDetails(true);
                                        setShowUserId(user._id);
                                    }}>
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName}</span>
                                    <span className="wd-last-name"> {user.lastName}</span>
                                </span>
                            </td>
                            <td className="wd-login-id">{user.loginId}</td>
                            <td className="wd-section">{user.section}</td>
                            <td className="wd-role">{user.role}</td>
                            <td className="wd-last-activity">{user.lastActivity}</td>
                            <td className="wd-total-activity">{user.totalActivity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
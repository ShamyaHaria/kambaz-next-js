"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function PeopleTable() {
    const params = useParams();
    const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
    const [users, setUsers] = useState<any[]>([]);
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const usersResponse = await axios.get(`${HTTP_SERVER}/api/users`);
                setUsers(usersResponse.data);

                const enrollmentsResponse = await axios.get(`${HTTP_SERVER}/api/enrollments`);
                setEnrollments(enrollmentsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const enrolledUsers = users.filter((usr) =>
        enrollments.some((enrollment) =>
            enrollment.user === usr._id && enrollment.course === cid
        )
    );

    return (
        <div id="wd-people-table">
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
                    {enrolledUsers.map((user: any) => (
                        <tr key={user._id}>
                            <td className="wd-full-name text-nowrap">
                                <FaUserCircle className="me-2 fs-1 text-secondary" />
                                <span className="wd-first-name">{user.firstName}</span>
                                <span className="wd-last-name"> {user.lastName}</span>
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
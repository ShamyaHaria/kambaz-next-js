"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";
import FormControl from "react-bootstrap/esm/FormControl";
import { FaPlus } from "react-icons/fa6";

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await client.findUsersByPartialName(name);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };

    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };

    const { uid } = useParams();

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    useEffect(() => {
        fetchUsers();
    }, [uid]);

    const generateLoginId = () => {
        let maxNumber = 0;
        users.forEach((user) => {
            if (user.loginId) {
                const match = user.loginId.match(/^(\d+)S$/);
                if (match) {
                    const num = parseInt(match[1], 10);
                    if (num > maxNumber) {
                        maxNumber = num;
                    }
                }
            }
        });
        const newNumber = (maxNumber + 1).toString().padStart(9, '0');
        return `${newNumber}S`;
    };

    const createUser = async () => {
        const loginId = generateLoginId();
        const user = await client.createUser({
            firstName: "New",
            lastName: `User${users.length + 1}`,
            username: `newuser${Date.now()}`,
            password: "password123",
            email: `email${users.length + 1}@neu.edu`,
            section: "S101",
            role: "STUDENT",
            loginId: loginId,
            totalActivity: "00:00:00",
        });
        setUsers([...users, user]);
    };

    return (
        <div>
            <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
                <FaPlus className="me-2" />
                Users
            </button>
            <h3>Users</h3>
            <FormControl onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
                className="float-start w-25 me-2 wd-filter-by-name" />
            <select value={role} onChange={(e) => filterUsersByRole(e.target.value)}
                className="form-select float-start w-25 wd-select-role" >
                <option value="">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="TA">Assistants</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrators</option>
            </select>
            <PeopleTable users={users} fetchUsers={fetchUsers} />
        </div>
    );
}
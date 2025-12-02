"use client";
import PeopleTable from "./Table";

export default function People() {
    const fetchUsers = () => {
        console.log("Fetching users...");
    };

    return (
        <div>
            <PeopleTable fetchUsers={fetchUsers} />
        </div>
    );
}
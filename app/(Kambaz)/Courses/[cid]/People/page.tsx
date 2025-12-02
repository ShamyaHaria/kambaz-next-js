"use client";
import PeopleTable from "./Table";

export default function People() {
    const fetchUsers = () => {
        console.log("Fetching users...");
    };

    return (
        <div>
            <PeopleTable users={[]} fetchUsers={fetchUsers} />
        </div>
    );
}
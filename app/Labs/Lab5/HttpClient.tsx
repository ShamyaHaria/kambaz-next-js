'use client';
import { useEffect, useState } from "react";
import axios from "axios";
const REMOTE_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function HttpClient() {
    const [welcomeOnClick, setWelcomeOnClick] = useState("");
    const fetchWelcomeOnClick = async () => {
        const response = await
            axios.get(`${REMOTE_SERVER}/lab5/welcome`);
        setWelcomeOnClick(response.data);
    };
    return (
        <div>
            <h3>HTTP Client</h3> <hr />
            <h4>Requesting on Click</h4>
            <button onClick={fetchWelcomeOnClick}>
                Fetch Welcome</button>
            Response from server:
            <b>{welcomeOnClick}</b>
        </div>
    );
}
"use client";

import { useState } from "react";
import { Form } from "react-bootstrap";

export default function DateStateVariable() {
    const [startDate, setStartDate] = useState(new Date());
    
    const dateObjectToHtmlDateString = (date: Date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString().padStart(2, "0")}-${date.getDate()
            .toString().padStart(2, "0")}`;
    };

    return (
        <div id="wd-date-state-variables">
            <h2>Date State Variables</h2>
            <h3 suppressHydrationWarning>{JSON.stringify(startDate)}</h3>
            <h3>{dateObjectToHtmlDateString(startDate)}</h3>
            <Form.Control
                type="date"
                value={dateObjectToHtmlDateString(startDate)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <hr />
        </div>
    );
}
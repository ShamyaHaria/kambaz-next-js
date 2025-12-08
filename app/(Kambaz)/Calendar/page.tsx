"use client";

import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

type ViewMode = "week" | "month";

function getMonthLabel(date: Date) {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<ViewMode>("month");

    const goToday = () => setCurrentDate(new Date());

    const goPrev = () => {
        const d = new Date(currentDate);
        if (view === "month") {
            d.setMonth(d.getMonth() - 1);
        } else {
            d.setDate(d.getDate() - 7);
        }
        setCurrentDate(d);
    };

    const goNext = () => {
        const d = new Date(currentDate);
        if (view === "month") {
            d.setMonth(d.getMonth() + 1);
        } else {
            d.setDate(d.getDate() + 7);
        }
        setCurrentDate(d);
    };

    // build month grid
    const firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDay = (firstOfMonth.getDay() + 6) % 7; // Monday=0
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();
    const monthCells = Array.from({ length: 42 }, (_, i) => {
        const dayNum = i - startDay + 1;
        return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
    });

    // week view range (Mon–Sun containing currentDate)
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        return d;
    });

    return (
        <div className="p-4" id="wd-calendar-page">
            {/* Header row */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={goToday}>
                        Today
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={goPrev}>
                        &lt;
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={goNext}>
                        &gt;
                    </Button>
                    <h3 className="ms-3 mb-0">
                        {view === "month"
                            ? getMonthLabel(currentDate)
                            : `${weekDays[0].toLocaleDateString()} – ${weekDays[6].toLocaleDateString()}`}
                    </h3>
                </div>
                <ButtonGroup aria-label="view switch">
                    <Button
                        variant={view === "week" ? "secondary" : "outline-secondary"}
                        size="sm"
                        onClick={() => setView("week")}
                    >
                        Week
                    </Button>
                    <Button
                        variant={view === "month" ? "secondary" : "outline-secondary"}
                        size="sm"
                        onClick={() => setView("month")}
                    >
                        Month
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                        Agenda
                    </Button>
                </ButtonGroup>
            </div>

            <div className="d-flex">
                {/* Main grid */}
                <div className="flex-fill me-4 border bg-white">
                    <div className="d-flex border-bottom text-center fw-semibold bg-light">
                        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                            <div key={d} className="flex-fill py-2 small">
                                {d}
                            </div>
                        ))}
                    </div>

                    {view === "month" ? (
                        // 6 weeks x 7 days with day numbers
                        Array.from({ length: 6 }).map((_, row) => (
                            <div key={row} className="d-flex" style={{ minHeight: 100 }}>
                                {monthCells.slice(row * 7, row * 7 + 7).map((day, idx) => (
                                    <div
                                        key={idx}
                                        className="flex-fill border-end border-bottom p-1"
                                        style={{ fontSize: 12 }}
                                    >
                                        {day && (
                                            <div className="fw-semibold mb-1">{day}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        // Week view columns for each day with time slots
                        <div>
                            {Array.from({ length: 24 }).map((_, hour) => (
                                <div key={hour} className="d-flex" style={{ minHeight: 40 }}>
                                    {weekDays.map((d, idx) => (
                                        <div
                                            key={idx}
                                            className="flex-fill border-end border-bottom p-1"
                                            style={{ fontSize: 11 }}
                                        >
                                            {idx === 0 && (
                                                <span className="text-muted">{hour.toString().padStart(2, "0")}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right sidebar mini-calendar + calendars list */}
                <div style={{ width: 280 }}>
                    <div className="border p-2 mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Button variant="outline-secondary" size="sm" onClick={goPrev}>
                                &lt;
                            </Button>
                            <span className="fw-semibold small">
                                {getMonthLabel(currentDate)}
                            </span>
                            <Button variant="outline-secondary" size="sm" onClick={goNext}>
                                &gt;
                            </Button>
                        </div>
                        {/* Mini calendar dates only */}
                        <div className="d-flex flex-wrap small text-center">
                            {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
                                <div
                                    key={`dow-${idx}`}
                                    style={{ width: "14.28%" }}
                                    className="fw-semibold"
                                >
                                    {d}
                                </div>
                            ))}
                            {monthCells.map((day, i) => (
                                <div
                                    key={`day-${i}`}
                                    style={{ width: "14.28%", padding: "2px 0" }}
                                    className={day ? "" : "text-muted"}
                                >
                                    {day || ""}
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="mb-2 fw-semibold small text-uppercase">Calendars</div>
                    <div className="border p-2 small" style={{ maxHeight: 260, overflowY: "auto" }}>
                        <div className="text-muted">No calendars configured.</div>
                    </div>

                    <div className="mt-3 text-danger small" style={{ cursor: "pointer" }}>
                        Calendar feed
                    </div>
                </div>
            </div>
        </div>
    );
}
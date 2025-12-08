"use client";

export default function LandingPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom right, #eff6ff, #ffffff, #eff6ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
            }}
        >
            <div style={{ maxWidth: "1024px", width: "100%" }}>
                <div
                    style={{
                        background: "white",
                        borderRadius: "16px",
                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                        border: "1px solid #e5e7eb",
                        overflow: "hidden",
                    }}
                >
                    {/* Hero */}
                    <div
                        style={{
                            background: "linear-gradient(to right, #2563eb, #1d4ed8)",
                            color: "white",
                            padding: "48px 32px",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "inline-block",
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: "9999px",
                                padding: "8px 24px",
                                marginBottom: "16px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                }}
                            >
                                FINAL PROJECT
                            </span>
                        </div>
                        <h1
                            style={{
                                fontSize: "48px",
                                fontWeight: "bold",
                                marginBottom: "12px",
                            }}
                        >
                            Kambaz Pazza
                        </h1>
                        <p
                            style={{
                                fontSize: "20px",
                                color: "#bfdbfe",
                                maxWidth: "672px",
                                margin: "0 auto",
                            }}
                        >
                            A comprehensive Q&amp;A platform integrated into the Kambaz
                            Learning Management System
                        </p>
                    </div>

                    {/* Body */}
                    <div style={{ padding: "40px 32px" }}>
                        {/* Student info */}
                        <div
                            style={{
                                marginBottom: "40px",
                                paddingBottom: "32px",
                                borderBottom: "1px solid #e5e7eb",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#1f2937",
                                    marginBottom: "24px",
                                }}
                            >
                                Student Information
                            </h2>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "24px",
                                }}
                            >
                                <div
                                    style={{
                                        background: "#eff6ff",
                                        borderRadius: "8px",
                                        padding: "20px",
                                        border: "1px solid #dbeafe",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "#2563eb",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        Student Name
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#1f2937",
                                        }}
                                    >
                                        Shamya Haria
                                    </div>
                                </div>
                                <div
                                    style={{
                                        background: "#eff6ff",
                                        borderRadius: "8px",
                                        padding: "20px",
                                        border: "1px solid #dbeafe",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "#2563eb",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        Course
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#1f2937",
                                        }}
                                    >
                                        CS5610 - Web Development
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Repositories */}
                        <div style={{ marginBottom: "40px" }}>
                            <h2
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#1f2937",
                                    marginBottom: "24px",
                                }}
                            >
                                Project Repositories
                            </h2>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px",
                                }}
                            >
                                <a
                                    href="https://github.com/ShamyaHaria/kambaz-next-js.git"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        background: "#f9fafb",
                                        borderRadius: "8px",
                                        padding: "20px",
                                        border: "1px solid #e5e7eb",
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                background: "#2563eb",
                                                borderRadius: "8px",
                                                padding: "12px",
                                                width: "48px",
                                                height: "48px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <span style={{ color: "white", fontSize: "24px" }}>⚛</span>
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "#1f2937",
                                                    fontSize: "18px",
                                                }}
                                            >
                                                Frontend Repository
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#6b7280",
                                                    fontFamily: "monospace",
                                                }}
                                            >
                                                kambaz-next-js
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: "20px" }}>→</span>
                                </a>

                                <a
                                    href="https://github.com/ShamyaHaria/kambaz-node-server-app.git"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        background: "#f9fafb",
                                        borderRadius: "8px",
                                        padding: "20px",
                                        border: "1px solid #e5e7eb",
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                background: "#16a34a",
                                                borderRadius: "8px",
                                                padding: "12px",
                                                width: "48px",
                                                height: "48px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <span style={{ color: "white", fontSize: "24px" }}>⚙</span>
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "#1f2937",
                                                    fontSize: "18px",
                                                }}
                                            >
                                                Backend Repository
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#6b7280",
                                                    fontFamily: "monospace",
                                                }}
                                            >
                                                kambaz-node-server-app
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: "20px" }}>→</span>
                                </a>
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{ textAlign: "center", paddingTop: "24px" }}>
                            <a
                                href="/Account/Signin"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    background: "#2563eb",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    padding: "16px 40px",
                                    borderRadius: "12px",
                                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                    textDecoration: "none",
                                }}
                            >
                                Enter Application
                                <span>→</span>
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            background: "#f9fafb",
                            padding: "24px 32px",
                            textAlign: "center",
                            borderTop: "1px solid #e5e7eb",
                        }}
                    >
                        <p style={{ fontSize: "14px", color: "#6b7280" }}>
                            Built with Next.js, React, TypeScript, Node.js, Express, and MongoDB
                        </p>
                        <p
                            style={{
                                fontSize: "12px",
                                color: "#9ca3af",
                                marginTop: "8px",
                            }}
                        >
                            Northeastern University - Khoury College of Computer Sciences
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
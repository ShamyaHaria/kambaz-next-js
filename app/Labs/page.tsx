'use client';

import React from "react";
import Link from "next/link";
import store from "./store";
import { Provider } from "react-redux";

export default function Labs() {
    return (
        <Provider store={store}>
        <div id="wd-labs">
            <h1>Shamya Haria (CS5610 18616 Web Development SEC 04 Fall 2025)</h1>
            <h1>Labs</h1>
            <ul>
                <li>
                    <Link href="/Labs/Lab1" id="wd-lab1-link">
                        Lab 1: HTML Examples </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab2" id="wd-lab2-link">
                        Lab 2: CSS Basics </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab3" id="wd-lab3-link">
                        Lab 3: JavaScript Fundamentals </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab4" id="wd-lab4-link">
                        Lab 4: React Click Events </Link>
                </li>
            </ul>
            <h2>Resources</h2>
            <ul>
                <li><a id="wd-github" href="https://github.com/ShamyaHaria/kambaz-next-js" target="_blank">Source Code Repository</a></li>
                <li><a id="wd-vercel" href="https://kambaz-next-js-seven-iota.vercel.app" target="_blank">Deployed Kambaz App (Vercel)</a></li>
            </ul>
        </div>
        </Provider>
    );
}
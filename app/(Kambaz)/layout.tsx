"use client";

import { ReactNode } from "react";
import "./styles.css";
import KambazNavigation from "./navigation";
import store from "./store";
import { Provider } from "react-redux";
import Session from "./Account/Session";

export default function KambazLayout(
    { children }: Readonly<{ children: ReactNode }>) {
    return (
        <Provider store={store}>
            <Session>
                <div id="wd-kambaz">
                    <div className="d-flex">
                        <KambazNavigation />
                    </div>
                    <div className="wd-main-content-offset p-3 flex-fill">
                        {children}
                    </div>
                </div>
            </Session>
        </Provider>
    );
}
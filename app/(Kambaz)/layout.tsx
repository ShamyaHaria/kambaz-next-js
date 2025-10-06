import { ReactNode } from "react";
import "./styles.css";

import KambazNavigation
    from "./navigation";
export default function KambazLayout(
    { children }:
        Readonly<{ children: ReactNode }>) {
    return (
        <div id="wd-kambaz">
            <div className="d-flex">
                <KambazNavigation />
            </div>
            <div className="wd-main-content-offset p-3  flex-fill">
                {children}
            </div>
        </div>
    );
}
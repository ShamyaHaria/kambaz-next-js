import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="d-flex">
            <div className="d-none d-md-block">
                <AccountNavigation />
            </div>
            <div className="flex-grow-1 p-4">
                {children}
            </div>
        </div>
    );
}
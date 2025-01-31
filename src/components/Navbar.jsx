import React, { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { Moon, Sun } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const { theme, setTheme } = useTheme();
    const [activePage, setActivePage] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        // Mendapatkan pathname dari URL
        const path = location.pathname;

        // Memperbarui state activePage berdasarkan pathname
        if (path === "/") {
            setActivePage("Home");
        } else if (path === "/about") {
            setActivePage("About");
        } else if (path === "/chat") {
            setActivePage("Chat");
        }
    }, [location]);

    return (
        <>
            <div className="flex pt-5 items-center">
                <nav className="relative w-full flex items-center justify-between">
                    <ul className="flex items-center min-w-0 space-x-4">
                        <li className="min-w-0">
                            <Link
                                to="/"
                                className={`relative font-medium lg:text-sm text-sm py-3 text-zinc-900 dark:text-white hover:text-zinc-900 hover:dark:text-white ${
                                    activePage === "Home"
                                        ? "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-yellow-500 after:scale-x-100"
                                        : "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-yellow-500 after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
                                }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="min-w-0">
                            <Link
                                to="/about"
                                className={`relative font-medium lg:text-sm text-sm py-3 text-zinc-900 dark:text-white hover:text-zinc-900 hover:dark:text-white ${
                                    activePage === "About"
                                        ? "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-yellow-500 after:scale-x-100"
                                        : "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-yellow-500 after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
                                }`}
                            >
                                About
                            </Link>
                        </li>
                        <li className="min-w-0">
                            <Link
                                to="/chat"
                                className={`relative font-medium py-3 lg:text-sm text-sm text-zinc-900 dark:text-white hover:text-zinc-900 hover:dark:text-white ${
                                    activePage === "Chat"
                                        ? "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-yellow-500 after:scale-x-100"
                                        : "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-yellow-500 after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
                                }`}
                            >
                                Chat
                            </Link>
                        </li>
                    </ul>
                    <Button
                        className="border-0 w-9 h-9 dark:bg-zinc-800 bg-gray-200"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? <Sun className="text-white" /> : <Moon className="text-slate-800" />}
                    </Button>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <header className="nav">
            <div className="container nav-inner">
                <div className="brand">Krishi Kisan </div>
                <nav className="menu">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/chatbot">Chatbot</NavLink>
                    <NavLink to="/smart-engine">Smart Engine</NavLink>
                    <NavLink to="/project-overview">Project Overview</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <button 
                        className="theme-toggle" 
                        onClick={handleThemeToggle}
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? "🌱" : "🌻"}
                    </button>
                </nav>
            </div>

        </header>

    );
}
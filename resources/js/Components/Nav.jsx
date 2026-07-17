import { useState, useEffect } from "react";

const THEME_KEY = "portfolio-theme";

function Nav() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return window.localStorage.getItem(THEME_KEY) || "light";
        }
        return "light";
    });
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        window.localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const links = [
        { id: "hero", label: "Home" },
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        // { id: "education", label: "Education" },
        { id: "contact", label: "Contact" },
    ];

    const scrollTo = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <nav className="portfolio-nav">
            <div className="portfolio-nav__inner">
                <a
                    href="#hero"
                    className="portfolio-nav__logo"
                    onClick={(e) => scrollTo(e, "hero")}
                >
                    <span className="portfolio-nav__logo-fhel">JB.</span>
                    <span className="portfolio-nav__logo-dev">dev</span>
                </a>
                <ul className="portfolio-nav__links">
                    {links.map(({ id, label }) => (
                        <li key={id}>
                            <a href={`#${id}`} onClick={(e) => scrollTo(e, id)}>
                                {label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <button
                            type="button"
                            className={`portfolio-nav__theme-toggle ${theme === "light" ? "portfolio-nav__theme-toggle--light" : ""}`}
                            onClick={toggleTheme}
                            title={
                                theme === "dark"
                                    ? "Switch to light mode"
                                    : "Switch to dark mode"
                            }
                            aria-label={
                                theme === "dark"
                                    ? "Switch to light mode"
                                    : "Switch to dark mode"
                            }
                        >
                            <span className="portfolio-nav__theme-knob">
                                {theme === "dark" ? (
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    </svg>
                                ) : (
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        aria-hidden="true"
                                    >
                                        <circle cx="12" cy="12" r="5" />
                                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                    </svg>
                                )}
                            </span>
                        </button>
                    </li>
                </ul>
                <button
                    type="button"
                    className={`portfolio-nav__hamburger ${menuOpen ? "portfolio-nav__hamburger--open" : ""}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <span className="portfolio-nav__hamburger-bar" />
                    <span className="portfolio-nav__hamburger-bar" />
                    <span className="portfolio-nav__hamburger-bar" />
                </button>
            </div>
            <div
                className={`portfolio-nav__mobile ${menuOpen ? "portfolio-nav__mobile--open" : ""}`}
            >
                <ul className="portfolio-nav__mobile-links">
                    {links.map(({ id, label }) => (
                        <li key={id}>
                            <a href={`#${id}`} onClick={(e) => scrollTo(e, id)}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="portfolio-nav__mobile-theme">
                    <span className="portfolio-nav__mobile-theme-label">
                        Theme
                    </span>
                    <button
                        type="button"
                        className={`portfolio-nav__theme-toggle ${theme === "light" ? "portfolio-nav__theme-toggle--light" : ""}`}
                        onClick={toggleTheme}
                        aria-label={
                            theme === "dark"
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                    >
                        <span className="portfolio-nav__theme-knob">
                            {theme === "dark" ? (
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    aria-hidden="true"
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            ) : (
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="5" />
                                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            )}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

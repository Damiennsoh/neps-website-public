"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationGroups } from "@/app/content/site";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeNavigation() {
    setOpenGroup(null);
    setMobileOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a className="brand" href="/" aria-label="NEPS home" onClick={closeNavigation}>
          <img src="/neps-logo.webp" width="58" height="58" alt="" />
          <span>
            NEPS
            <small>Youth wellbeing. Shared futures.</small>
          </span>
        </a>
        <button
          className="mobile-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <nav
          aria-label="Main navigation"
          className={`main-nav${mobileOpen ? " is-open" : ""}`}
          id="primary-navigation"
        >
          {navigationGroups.map((group, index) => {
            const isActive = group.paths.includes(pathname);
            const expanded = openGroup === index;
            const dropdownId = `nav-group-${index}`;
            return (
              <div className="nav-group" key={group.label}>
                <button
                  className={`nav-trigger${isActive ? " active" : ""}`}
                  type="button"
                  aria-controls={dropdownId}
                  aria-expanded={expanded}
                  onClick={() => setOpenGroup(expanded ? null : index)}
                >
                  {group.label}
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="nav-dropdown" hidden={!expanded} id={dropdownId}>
                  {group.links.map((link) => (
                    <a
                      href={link.href}
                      key={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      onClick={closeNavigation}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
          <a className="button button-small" href="/contact/" onClick={closeNavigation}>
            Contact NEPS
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7h10v10M7 17 17 7" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}

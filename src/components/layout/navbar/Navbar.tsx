import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  Menu,
  X,
  ScanLine,
  History,
  UserRound,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

import type { AuthUser } from "../../../features/auth/auth.type";
import Avatar from "./Avatar";

interface NavbarProps {
  user?: AuthUser | null;
}
const publicLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "How It Works", to: "/about#how-it-works" },
];

const linkBase = "text-base font-bold tracking-wide transition-colors";
const activeColor = "text-red-700";
const idleColor = "text-white hover:text-red-500";

export default function Navbar({ user = null }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === "admin";

  const closeMenu = () => setIsMenuOpen(false);

  const isPublicActive = (to: string) => {
    const [path, targetHash] = to.split("#");
    if (targetHash) return pathname === path && hash === `#${targetHash}`;

    const matchesPath =
      path === "/"
        ? pathname === "/"
        : pathname === path || pathname.startsWith(`${path}/`);
    const hashOwnedByOtherLink = publicLinks.some(
      (l) => l.to.startsWith(`${path}#`) && hash === `#${l.to.split("#")[1]}`,
    );
    return matchesPath && !hashOwnedByOtherLink;
  };

  const desktopLink = (active: boolean) =>
    `px-3 py-2 ${linkBase} ${active ? activeColor : idleColor}`;

  const mobileLink = (active: boolean) =>
    `rounded-lg px-3 py-3 ${linkBase} ${
      active
        ? "bg-red-700/10 text-red-700"
        : "text-white hover:bg-white/5 hover:text-red-500"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 font-sans backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-3 lg:justify-self-start"
          aria-label="VulnixAI home"
        >
          <ShieldCheck
            size={38}
            strokeWidth={1.8}
            className="text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] transition"
          />

          <span className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-[0.18em] text-white transition-colors group-hover:text-red-600">
              VULNIX AI
            </span>
            {/* <span className="mt-1.5 font-mono text-[10px] font-semibold tracking-[0.25em] text-red-600 transition-colors">
              CYBER INTELLIGENCE
            </span> */}
          </span>
        </Link>

        {/* Desktop navigation (centered) */}
        <div className="hidden items-center gap-2 lg:flex xl:gap-4">
          {publicLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={() => desktopLink(isPublicActive(link.to))}
            >
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated && (
            <>
              <NavLink
                to="/scan"
                className={({ isActive }) => desktopLink(isActive)}
              >
                <span className="flex items-center gap-2">
                  <ScanLine size={18} />
                  Scan
                </span>
              </NavLink>

              <NavLink
                to="/scan-history"
                className={({ isActive }) => desktopLink(isActive)}
              >
                <span className="flex items-center gap-2">
                  <History size={18} />
                  History
                </span>
              </NavLink>
            </>
          )}
        </div>

        {/* Desktop auth actions */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex lg:justify-self-end">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 px-3 py-2 ${linkBase} ${
                    isActive ? activeColor : idleColor
                  }`
                }
              >
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 whitespace-nowrap px-3 py-2 ${linkBase} ${
                      isActive ? activeColor : idleColor
                    }`
                  }
                >
                  <LayoutDashboard size={18} />
                  <span>Admin Dashboard</span>
                </NavLink>
              )}

              <Link
                to="/profile"
                aria-label="Your profile"
                title={user?.name ?? "Profile"}
                className="transition hover:opacity-80"
              >
                <Avatar user={user} />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-3 py-2 ${linkBase} text-white hover:text-red-500`}
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-800 px-5 py-2.5 text-base font-bold tracking-wide text-white shadow-lg shadow-red-700/30 transition hover:from-red-500 hover:to-red-700 hover:shadow-red-600/40"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-white transition hover:border-red-600/60 hover:text-red-500 lg:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-black px-4 py-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {publicLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={closeMenu}
                className={() => mobileLink(isPublicActive(link.to))}
              >
                {link.label}
              </NavLink>
            ))}

            {isAuthenticated && (
              <>
                <NavLink
                  to="/scan"
                  onClick={closeMenu}
                  className={({ isActive }) => mobileLink(isActive)}
                >
                  <span className="flex items-center gap-2">
                    <ScanLine size={18} />
                    Scan
                  </span>
                </NavLink>

                <NavLink
                  to="/scan-history"
                  onClick={closeMenu}
                  className={({ isActive }) => mobileLink(isActive)}
                >
                  <span className="flex items-center gap-2">
                    <History size={18} />
                    History
                  </span>
                </NavLink>

                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className={({ isActive }) => mobileLink(isActive)}
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </span>
                </NavLink>
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-3 ${linkBase} ${
                        isActive ? activeColor : idleColor
                      }`
                    }
                  >
                    <LayoutDashboard size={18} />
                    <span>Admin Dashboard</span>
                  </NavLink>
                )}

                <NavLink
                  to="/profile"
                  onClick={closeMenu}
                  className={({ isActive }) => mobileLink(isActive)}
                >
                  <span className="flex items-center gap-2">
                    <UserRound size={18} />
                    Profile & Settings
                  </span>
                </NavLink>
              </>
            )}

            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar user={user} />
                  <div className="min-w-0">
                    <p className="truncate text-base font-bold text-white">
                      {user?.name}
                    </p>
                    <p className="truncate text-sm text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={`rounded-lg border border-white/15 px-4 py-3 text-center ${linkBase} text-white hover:border-red-600/60 hover:text-red-500`}
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-800 px-4 py-3 text-base font-bold tracking-wide text-white shadow-lg shadow-red-700/30"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

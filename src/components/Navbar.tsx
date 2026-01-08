import { useMemo, useState, useEffect, useRef, type JSX } from 'react';
import type { NavbarProps } from '../types/app-types';
import '../styles/Navbar.css';

export default function Navbar({ user, title, onLogout }: NavbarProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const displayName = useMemo(() => {
    const raw = user?.userId ?? '';
    const base = raw.includes('@') ? raw.split('@')[0] : raw;
    const name =
      base
        .split(/[.\-_]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ') || raw;
    return name || 'User';
  }, [user]);

  const displayRole = user?.role ?? 'Employee';
  const userId = user?.userId ?? 'user';
  const displayInitial = (displayName.charAt(0) || 'U').toUpperCase();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (!menuRef.current) return;
      const target = event.target;
      if (target instanceof Node && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <nav className="navbar app-navbar shadow-sm fixed-top">
      <div className="container-fluid">
        <span className="navbar-brand fw-semibold">{title}</span>

        <div className="profile-menu-wrapper" ref={menuRef}>
          <button
            className="btn profile-pill fw-semibold"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            type="button"
          >
            <div className="profile-pill-text">
              <span className="profile-pill-name">{displayName}</span>
              <span className="profile-pill-role">{displayRole}</span>
            </div>
            <span className={`chevron ${menuOpen ? 'open' : ''}`} />
          </button>

          {menuOpen && (
            <div className="profile-menu shadow-lg rounded-4">
              <header className="profile-menu__header">
                <div>
                  <div className="profile-menu__label">Manage account</div>
                </div>
              </header>

              <section className="profile-card">
                <div className="profile-avatar">{displayInitial}</div>
                <div className="profile-info">
                  <div className="profile-info__name">{displayName}</div>
                  <div className="profile-info__meta">
                    {userId}
                    <span className="profile-info__role">({displayRole})</span>
                  </div>
                  <div className="profile-info__email">{userId}@example.org</div>
                </div>
              </section>

              <div className="profile-menu__actions">
                <button type="button" className="profile-action" onClick={onLogout}>
                  <span className="e-icons e-export" aria-hidden="true" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
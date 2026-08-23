import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { profile } from '../data/profile';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // TODO 7 (done): every <a href="..."> is now a <NavLink to="...">.
  // A plain <a> tells the browser to fetch a brand new document, which throws
  // away the whole React app and re-downloads everything. NavLink intercepts
  // the click, pushes the new URL with the History API, and lets React Router
  // re-render only the matched route component. NavLink additionally exposes
  // an `isActive` flag so we can style the link for the current page.
  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Main navigation">
        <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__brand-mark">{profile.initials}</span>
          <span className="navbar__brand-text">{profile.name}</span>
        </NavLink>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>

        <ul
          id="primary-navigation"
          className={open ? 'navbar__links navbar__links--open' : 'navbar__links'}
        >
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                // `end` limits the active match to an exact URL match. Without
                // it, "/" would be treated as active on every single page,
                // because every path starts with "/".
                end={link.to === '/'}
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

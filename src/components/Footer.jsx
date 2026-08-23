import { Link } from 'react-router-dom';
import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} {profile.name}. Built with React,
          React Router, and Vite.
        </p>
        <nav className="footer__links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}

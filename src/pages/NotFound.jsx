import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <div className="page">
      <div className="notice notice--center">
        <p className="notice__code">404</p>
        <h1 className="notice__title">Page Not Found</h1>
        <p className="notice__text">
          Nothing lives at <code>{pathname}</code>. It may have been moved, or
          the URL might have a typo in it.
        </p>

        <div className="notice__actions">
          {/* TODO 8 (done): a <Link>, not an <a>. An <a> would make the browser
              request the URL from the server and reload the entire app;
              <Link> hands the navigation to React Router instead. */}
          <Link to="/" className="btn btn--primary">
            Back to Home
          </Link>
          <Link to="/projects" className="btn btn--ghost">
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}

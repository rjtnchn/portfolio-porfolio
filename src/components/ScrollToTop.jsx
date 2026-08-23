import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A full page load always starts you at the top of the document. Client-side
 * navigation does not, because the document never changes — so clicking a link
 * near the bottom of /projects would drop you halfway down the detail page.
 * This component watches the pathname and scrolls back to the top on change.
 * It renders nothing.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

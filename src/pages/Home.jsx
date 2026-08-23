import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { projects } from '../data/projects';

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <p className="hero__eyebrow">Portfolio</p>
        <h1 className="hero__title">
          Hi, I&apos;m <span className="accent">{profile.name}</span>.
        </h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__tagline">{profile.tagline}</p>

        <div className="hero__actions">
          {/* Call-to-action into the Projects page — required by the spec.
              Link, not <a>, so the navigation stays client-side. */}
          <Link to="/projects" className="btn btn--primary">
            View my projects
          </Link>
          <Link to="/contact" className="btn btn--ghost">
            Get in touch
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Featured work</h2>
          <Link to="/projects" className="section__link">
            See all {projects.length} projects
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <ul className="featured">
          {featured.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`} className="featured__item">
                <span className="featured__title">{project.title}</span>
                <span className="featured__summary">{project.summary}</span>
                <span className="featured__cue" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">What I&apos;m focused on</h2>
        <div className="focus">
          <div className="focus__item">
            <h3>Component-driven UI</h3>
            <p>
              Small, reusable components fed by a single data source, so adding
              content means editing data rather than duplicating markup.
            </p>
          </div>
          <div className="focus__item">
            <h3>Predictable state</h3>
            <p>
              Keeping state minimal and deriving everything else during render.
              Fewer sources of truth, fewer stale-data bugs.
            </p>
          </div>
          <div className="focus__item">
            <h3>Shipping it</h3>
            <p>
              A project is not done until it is deployed and someone else can
              open the link. This site is deployed on Vercel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

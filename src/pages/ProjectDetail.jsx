import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects, getProjectById } from '../data/projects';

export default function ProjectDetail() {
  // useParams() reads the ":id" segment declared in the route path
  // <Route path="/projects/:id" ... />. The value is ALWAYS a string,
  // because a URL is text — so "/projects/2" gives id === "2", not 2.
  const { id } = useParams();
  const navigate = useNavigate();

  const project = getProjectById(id);

  // Anyone can type /projects/999 by hand, so the missing case is not an edge
  // case — it needs a real, friendly response.
  if (!project) {
    return (
      <div className="page">
        <div className="notice">
          <p className="notice__eyebrow">Project not found</p>
          <h1 className="notice__title">
            There&apos;s no project with the id &ldquo;{id}&rdquo;.
          </h1>
          <p className="notice__text">
            The link may be out of date, or the id might have been mistyped.
            Here are the projects that do exist:
          </p>

          <ul className="notice__list">
            {projects.map((item) => (
              <li key={item.id}>
                <Link to={`/projects/${item.id}`}>
                  {item.id} &mdash; {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="notice__actions">
            <Link to="/projects" className="btn btn--primary">
              Back to all projects
            </Link>
            <Link to="/" className="btn btn--ghost">
              Go home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/projects">Projects</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.title}</span>
      </nav>

      <header className="page__head">
        <div className="detail__titleRow">
          <h1 className="page__title">{project.title}</h1>
          <span
            className={project.status === 'Live' ? 'badge badge--live' : 'badge'}
          >
            {project.status}
          </span>
        </div>
        <p className="page__lead">{project.summary}</p>
      </header>

      <dl className="meta">
        <div className="meta__item">
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div className="meta__item">
          <dt>Year</dt>
          <dd>{project.year}</dd>
        </div>
        <div className="meta__item">
          <dt>Project id</dt>
          <dd>
            <code>{id}</code>{' '}
            <span className="meta__hint">(read from the URL)</span>
          </dd>
        </div>
      </dl>

      <section className="section">
        <h2 className="section__title">Overview</h2>
        <div className="prose">
          <p>{project.description}</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">What it does</h2>
        <ul className="checklist">
          {project.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">Built with</h2>
        <ul className="tags">
          {project.tech.map((item) => (
            <li key={item} className="tag">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">What I took away</h2>
        <blockquote className="quote">{project.takeaway}</blockquote>
      </section>

      <div className="detail__links">
        {/* External destinations are real <a> tags with rel="noreferrer".
            React Router only handles URLs inside this app. */}
        <a
          href={project.repo}
          className="btn btn--primary"
          target="_blank"
          rel="noreferrer"
        >
          View source
        </a>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => navigate(-1)}
        >
          &larr; Go back
        </button>
      </div>

      <nav className="pager" aria-label="Project navigation">
        {previous ? (
          <Link to={`/projects/${previous.id}`} className="pager__link">
            <span className="pager__dir">&larr; Previous</span>
            <span className="pager__title">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/projects/${next.id}`} className="pager__link pager__link--next">
            <span className="pager__dir">Next &rarr;</span>
            <span className="pager__title">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

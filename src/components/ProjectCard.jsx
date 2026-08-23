import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <div className="card__head">
        <h3 className="card__title">{project.title}</h3>
        <span
          className={
            project.status === 'Live'
              ? 'badge badge--live'
              : 'badge'
          }
        >
          {project.status}
        </span>
      </div>

      <p className="card__summary">{project.summary}</p>

      <ul className="tags" aria-label={`Technologies used in ${project.title}`}>
        {project.tech.map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
      </ul>

      <div className="card__footer">
        {/* Link builds the detail URL from the project id. Clicking it is a
            client-side navigation — no page reload, no lost app state. */}
        <Link to={`/projects/${project.id}`} className="btn btn--sm">
          View details
          <span aria-hidden="true"> &rarr;</span>
        </Link>
        <span className="card__year">{project.year}</span>
      </div>
    </article>
  );
}

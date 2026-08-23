import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

// Build the filter list from the data itself so it never drifts out of sync.
const allTech = ['All', ...new Set(projects.flatMap((p) => p.tech))].slice(0, 9);

export default function Projects() {
  const [query, setQuery] = useState('');
  const [tech, setTech] = useState('All');

  // Derived during render, not stored in state — so it can never go stale.
  const visible = projects.filter((project) => {
    const matchesTech = tech === 'All' || project.tech.includes(tech);
    const haystack = `${project.title} ${project.summary}`.toLowerCase();
    const matchesQuery = haystack.includes(query.trim().toLowerCase());
    return matchesTech && matchesQuery;
  });

  return (
    <div className="page">
      <header className="page__head">
        <p className="page__eyebrow">Projects</p>
        <h1 className="page__title">Things I&apos;ve built</h1>
        <p className="page__lead">
          {projects.length} projects from my coursework and personal practice.
          Open any one of them for the full write-up.
        </p>
      </header>

      <div className="filters">
        <label className="filters__search">
          <span className="visually-hidden">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects..."
          />
        </label>

        <div className="filters__chips" role="group" aria-label="Filter by technology">
          {allTech.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTech(item)}
              aria-pressed={tech === item}
              className={tech === item ? 'chip chip--active' : 'chip'}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        // The grid is rendered by mapping over the data array — the six
        // projects are never written out as six separate blocks of JSX.
        <div className="grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="empty">
          No projects match that filter. Try clearing the search or picking
          &ldquo;All&rdquo;.
        </p>
      )}
    </div>
  );
}

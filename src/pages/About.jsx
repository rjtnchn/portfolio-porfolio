import { Link } from 'react-router-dom';
import { profile, skills, education, experience } from '../data/profile';

export default function About() {
  return (
    <div className="page">
      <header className="page__head">
        <p className="page__eyebrow">About</p>
        <h1 className="page__title">{profile.name}</h1>
        <p className="page__lead">{profile.role}</p>
      </header>

      <section className="section">
        <h2 className="section__title">Bio</h2>
        <div className="prose">
          <p>
            I&apos;m an Information Technology student focused on front-end web
            development. Most of what I know came from building things, breaking
            them, and figuring out why they broke — which is still my favourite
            way to learn a new tool.
          </p>
          <p>
            My current work is in React: composing interfaces out of small
            components, keeping state as small as possible, and making sure the
            result is usable on a phone and with a keyboard, not just on my
            laptop. {profile.resumeNote}
          </p>
          <p>
            Outside of coursework I rebuild interfaces I admire as practice, which
            is how I ended up caring about details like focus styles, loading
            states, and what happens when a request fails.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Skills</h2>
        <div className="skills">
          {skills.map((group) => (
            <div key={group.group} className="skills__group">
              <h3 className="skills__heading">{group.group}</h3>
              <ul className="tags">
                {group.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Education</h2>
        <ol className="timeline">
          {education.map((entry) => (
            <li key={entry.id} className="timeline__item">
              <div className="timeline__header">
                <h3 className="timeline__title">{entry.title}</h3>
                <span className="timeline__period">{entry.period}</span>
              </div>
              <p className="timeline__org">{entry.org}</p>
              <p className="timeline__detail">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">Experience</h2>
        <ol className="timeline">
          {experience.map((entry) => (
            <li key={entry.id} className="timeline__item">
              <div className="timeline__header">
                <h3 className="timeline__title">{entry.title}</h3>
                <span className="timeline__period">{entry.period}</span>
              </div>
              <p className="timeline__org">{entry.org}</p>
              <p className="timeline__detail">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="callout">
        <h2 className="callout__title">Want to see the work?</h2>
        <p className="callout__text">
          Every project below includes what I built, the stack, and what I took
          away from it.
        </p>
        <Link to="/projects" className="btn btn--primary">
          Browse projects
        </Link>
      </section>
    </div>
  );
}

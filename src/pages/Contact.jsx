import { useState } from 'react';
import { profile } from '../data/profile';

const EMPTY = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(values) {
    const next = {};
    if (!values.name.trim()) next.name = 'Please tell me your name.';
    if (!values.email.trim()) {
      next.email = 'An email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'That does not look like a valid email address.';
    }
    if (values.message.trim().length < 10) {
      next.message = 'Please write at least 10 characters.';
    }
    return next;
  }

  function handleSubmit(event) {
    // The form does not post anywhere real, so the default full-page submit
    // (which would reload the app and wipe React state) is prevented.
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSent(true);
      setForm(EMPTY);
    }
  }

  return (
    <div className="page">
      <header className="page__head">
        <p className="page__eyebrow">Contact</p>
        <h1 className="page__title">Let&apos;s talk</h1>
        <p className="page__lead">
          Open to internships, junior front-end roles, and student
          collaborations. The fastest way to reach me is email.
        </p>
      </header>

      <div className="contact">
        <section className="contact__details">
          <h2 className="section__title">Details</h2>
          <ul className="contact__list">
            <li>
              <span className="contact__label">Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span className="contact__label">Phone</span>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                {profile.phone}
              </a>
            </li>
            <li>
              <span className="contact__label">Location</span>
              <span>{profile.location}</span>
            </li>
            <li>
              <span className="contact__label">GitHub</span>
              <a href={profile.github} target="_blank" rel="noreferrer">
                {profile.github.replace('https://', '')}
              </a>
            </li>
            <li>
              <span className="contact__label">LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedin.replace('https://www.', '')}
              </a>
            </li>
          </ul>
        </section>

        <section className="contact__form">
          <h2 className="section__title">Send a message</h2>

          {sent && (
            <p className="alert alert--success" role="status">
              Thanks — your message passed validation. This demo form does not
              send anywhere real yet.
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p className="field__error" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p className="field__error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p className="field__error" id="message-error">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn--primary">
              Send message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

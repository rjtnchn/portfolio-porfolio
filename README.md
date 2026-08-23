# Portfolio & Resume — CCS112 Laboratory Activity 3

Client-side routing and navigation in a deployed React single-page application.

**Live site:** _paste your Vercel URL here after deploying_
**Stack:** React 19 · React Router 7 · Vite 8 · deployed on Vercel

---

## Run it locally

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

---

## Project structure

```
index.html
vercel.json              # SPA rewrite so deep links survive a refresh
vite.config.js
public/
  favicon.svg
src/
  main.jsx               # BrowserRouter wraps <App />
  App.jsx                # Navbar + <Routes> + Footer (the persistent shell)
  index.css              # all styling, incl. the active NavLink state
  components/
    Navbar.jsx           # NavLink nav with isActive styling + mobile menu
    Footer.jsx
    ProjectCard.jsx      # one card, reused for every project
    ScrollToTop.jsx      # resets scroll position on route change
  pages/
    Home.jsx
    About.jsx
    Projects.jsx         # renders the list with .map()
    ProjectDetail.jsx    # reads :id with useParams()
    Contact.jsx
    NotFound.jsx
  data/
    projects.js          # the 6 projects + getProjectById() helper
    profile.js           # name, contact, skills, education, experience
```

### Personalise it

All personal details live in `src/data/profile.js`, and all project content in
`src/data/projects.js`. Placeholders that need your real information are marked
with `TODO` comments (name, email, phone, school, LinkedIn). Editing those two
files updates every page, the navbar brand, and the footer.

---

## Routes

| Route | Page | Behaviour |
|---|---|---|
| `/` | Home | Intro, name/role, CTA link into Projects, three featured projects |
| `/about` | About | Bio, grouped skills, education and experience timelines |
| `/projects` | Projects | All 6 projects rendered via `.map()`, plus search and tech filters |
| `/projects/:id` | ProjectDetail | Looks up the project by the `:id` param; friendly fallback if none matches |
| `/contact` | Contact | Contact details and a validated (non-submitting) form |
| `*` | NotFound | Custom 404 with a `<Link>` back to Home |

---

# Assessment — Written Explanations

## 1. How does client-side routing avoid a full page reload?

A normal `<a href="/about">` is a request for a **new document**. The browser
tears down the current page, asks the server for `/about`, and rebuilds
everything from scratch: new HTML parse, new CSS, new JavaScript, new React
tree. Every bit of in-memory state is lost and the user sees a flash.

React Router never lets that request happen. `<Link>` and `<NavLink>` render a
real `<a>` (so middle-click, right-click, and screen readers still behave
correctly) but attach an `onClick` that calls `preventDefault()` on ordinary
left-clicks. Instead of navigating, it calls the History API —
`history.pushState()` — which changes the URL in the address bar **without
issuing a network request**. The router is subscribed to that history object, so
the URL change updates its internal location state, `<Routes>` re-matches the
new path, and React re-renders only the component that changed.

The consequence is that the document, the CSS, the JS bundle, and the React
component tree all stay alive. Only the matched route element is swapped. This
is why the navbar in `App.jsx` does not flicker between pages — it is never
unmounted, because it sits outside `<Routes>`.

## 2. Why does `<BrowserRouter>` go in `main.jsx` around `<App />`?

`BrowserRouter` provides the router **context**. Every routing feature —
`Routes`, `Route`, `Link`, `NavLink`, `useParams`, `useLocation`,
`useNavigate` — reads from that context, so each of them must be rendered
somewhere beneath a router. Wrapping the very top of the tree in `main.jsx` is
the simplest way to guarantee that every component in the app qualifies.

If it were placed lower down — say inside `App.jsx` but only around `<Routes>` —
then `Navbar` would sit outside the router, and its `NavLink`s would throw an
error about being used outside a `<Router>`.

`BrowserRouter` specifically is the variant backed by the HTML5 History API, so
URLs look clean (`/projects/3`). `HashRouter` would produce `/#/projects/3`,
which needs no server configuration but is uglier and worse for sharing links.

## 3. How does `NavLink` know which page is active?

`NavLink` compares its `to` prop against the current location and passes the
result to whichever of `className`, `style`, or `children` you supply as a
function:

```jsx
<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? 'navbar__link navbar__link--active' : 'navbar__link')}
>
  About
</NavLink>
```

Because the router re-renders on every location change, `isActive` is always
current — no manual state tracking, no comparing `window.location` by hand.

**The `end` prop matters for the Home link.** By default `NavLink` matching is
*prefix-based*, and every path in the app begins with `/`. So a plain
`<NavLink to="/">` would report `isActive: true` on `/about`, `/projects`, and
everywhere else — Home would look permanently selected. Adding `end` restricts
the match to an exact one:

```jsx
<NavLink to="/" end>Home</NavLink>
```

In `Navbar.jsx` this is applied conditionally with `end={link.to === '/'}`, so
only Home gets exact matching while the others keep useful prefix behaviour
(`/projects` stays highlighted while you are reading `/projects/3`).

## 4. How does the dynamic `/projects/:id` route work?

The colon marks a **URL parameter** — a named placeholder that matches any
single path segment:

```jsx
<Route path="/projects/:id" element={<ProjectDetail />} />
```

`ProjectDetail` reads it with `useParams()`, which returns an object keyed by
the names used in the path:

```jsx
const { id } = useParams();          // "3" for /projects/3
const project = getProjectById(id);
```

One component therefore serves all six projects. Adding a seventh project means
adding one object to `projects.js` — no new route, no new component.

**The type gotcha:** a URL is text, so `useParams()` always returns **strings**.
`id` is `"3"`, not `3`. Since the ids in `projects.js` are numbers, a strict
`===` comparison would silently fail every time:

```js
projects.find((p) => p.id === id)          // always undefined: 3 === "3" is false
projects.find((p) => String(p.id) === String(id))   // correct
```

This project puts that comparison in a single `getProjectById()` helper so the
cast cannot be forgotten at a call site.

**The missing-project case is not optional.** Anyone can type
`/projects/9999`, and old links rot. `getProjectById` returns `undefined`, so
`ProjectDetail` guards early and renders a helpful message listing the ids that
do exist, rather than crashing on `project.title` of `undefined`.

## 5. Why must the `*` route come last?

`<Routes>` does not simply take the first route that matches — React Router v6+
scores every route and picks the most specific one, and `path="*"` is
deliberately scored lowest. In practice, though, **order still matters for
correctness and readability**, and the convention is to put `*` last:

- It documents intent: everything above is a real page, this is the fallback.
- It is the behaviour every React Router developer expects when reading the file.
- Within a set of routes of *equal* specificity, declaration order decides the
  winner, so relying on order is the habit that keeps you out of trouble in
  nested route configs.

`*` is a splat: it matches any remaining path, however many segments deep. That
is why `/projects/1/extra/deep` lands on the 404 page rather than erroring, and
why `NotFound` is what catches genuinely unknown URLs like `/resume`.

Verified behaviour in this app: `/definitely-not-a-page` and
`/projects/1/extra/deep` both render the 404 page, while `/` still renders Home
(the catch-all does not leak into valid routes).

## 6. Why does a direct visit or refresh 404 on Vercel without `vercel.json`?

This is the single most important idea in the lab, and it comes down to **who
handles the URL**.

React Router runs **in the browser, inside JavaScript that has already loaded**.
It can only interpret a URL once `index.html` and the JS bundle are running.
Clicking a `<Link>` works because the app is already live — the router handles
it entirely in memory and the server is never contacted.

A **direct visit or a refresh is different.** Typing
`your-site.vercel.app/projects` and hitting Enter sends a real HTTP GET for the
path `/projects` to Vercel's static file server. That server looks for a file at
`/projects` in the `dist/` output. A Vite build produces only:

```
dist/index.html
dist/assets/index-[hash].js
dist/assets/index-[hash].css
```

There is no `projects` file and no `projects/index.html`, so the server responds
**404 before any JavaScript is ever downloaded**. React Router does not get a
chance to run — the app that knows about `/projects` was never loaded.

The fix is to tell the server: for any path you cannot serve as a real file,
return `index.html` anyway.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Now the request for `/projects` is answered with `index.html`, the bundle loads,
`BrowserRouter` reads `window.location.pathname` (still `/projects`, because a
**rewrite** is server-side and invisible to the browser), and `<Routes>` renders
the Projects page. The URL the user typed is preserved.

**Rewrite, not redirect.** A redirect would send a `301`/`302` and *change* the
address bar to `/`, throwing away the requested route — the user would ask for
`/projects/3` and land on Home. A rewrite serves different content at the same
URL, which is exactly what an SPA needs.

Static assets still work because Vercel checks the filesystem first: real files
like `/assets/index-abc.js` are served directly, and only unmatched paths fall
through to the rewrite.

One honest trade-off: with this setup the server returns HTTP **200** for a
genuinely non-existent path like `/nope`, even though the user sees the 404
page. The status code is a lie to crawlers. That is an inherent limitation of
client-side 404s in a static SPA; fixing it properly requires server-side
rendering.

---

## Deployment checklist

1. Push to GitHub (`main` branch).
2. vercel.com → **Add New Project** → import this repository.
3. Vercel auto-detects Vite — Build Command `npm run build`, Output Directory
   `dist`. Deploy.
4. Click through every navbar link and confirm no full page reload (the browser
   loading spinner should not appear).
5. Type `your-site.vercel.app/projects` directly into the address bar and press
   Enter. Then refresh on `/projects/3`. Both must load correctly — that is the
   `vercel.json` rewrite doing its job.
6. Visit `your-site.vercel.app/nope` and confirm the custom 404 page renders
   with a working link back to Home.

### Verified locally before deploying

- `npm run build` completes with no errors or warnings.
- All 9 route cases render the expected page, with the navbar and footer present
  on every one, and the catch-all does not capture valid routes.
- Dev server returns HTTP 200 for `/`, `/about`, `/projects`, `/projects/3`,
  `/projects/999`, `/contact`, and `/nope`.

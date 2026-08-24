// Every project on /projects and /projects/:id is rendered from this one array.
// `id` is what shows up in the URL, so ProjectDetail can look the project back
// up from the `:id` route parameter.
//
// Note: useParams() always hands you a STRING (e.g. "2"), never a number,
// because a URL is just text. Compare accordingly — see ProjectDetail.jsx.

export const projects = [

  {
    id: 1,
    title: 'Student Directory',
    summary:
      'A searchable, filterable directory of student records powered by useState.',
    description:
      'Built to get comfortable with state. A search box filters the student list as you type, and a course dropdown narrows it further. Both filters are held in useState and combined in a single derived list during render, so the displayed results are never stored in state — they are always computed from the current inputs.',
    highlights: [
      'Live search that filters on every keystroke (controlled input)',
      'Second filter by course, combinable with the search term',
      'Derived filtered list computed during render, not duplicated in state',
      'Friendly empty state when no student matches the query',
    ],
    tech: ['React', 'useState', 'Controlled Inputs', 'Array.filter()'],
    role: 'Solo — Laboratory Activity 2',
    year: '2026',
    status: 'Completed',
    link: 'https://github.com/rjtnchn',
    repo: 'https://github.com/rjtnchn',
    takeaway:
      'Storing the filtered array in state was my first instinct and it caused stale results immediately. Deriving it on each render fixed the bug and deleted code.',
  },
  {
    id: 2,
    title: 'Portfolio & Resume Site',
    summary:
      'This site — a multi-page single-page application with client-side routing and a live Vercel deployment.',
    description:
      'A five-page portfolio wired up with react-router-dom. The navbar and footer are rendered once in App.jsx around the <Routes> block, so they persist while only the matched page component swaps out. Includes a dynamic /projects/:id route read with useParams, a catch-all 404, and a vercel.json rewrite so deep links survive a refresh.',
    highlights: [
      'BrowserRouter + Routes/Route for instant, reload-free navigation',
      'NavLink active styling that tracks the current page',
      'Dynamic /projects/:id route resolved with useParams',
      'Catch-all "*" route rendering a custom 404 page',
      'vercel.json rewrite so direct visits and refreshes reach index.html',
    ],
    tech: ['React', 'React Router v7', 'Vite', 'Vercel', 'CSS'],
    role: 'Solo — Laboratory Activity 3',
    year: '2026',
    status: 'Live',
    link: 'https://github.com/rjtnchn/portfolio-porfolio',
    repo: 'https://github.com/rjtnchn/portfolio-porfolio',
    takeaway:
      'The refresh-gives-404 problem finally made routing click for me: the router only exists after index.html loads, so the server has to be told to serve index.html for paths it does not recognise.',
  },
  {
    id: 3,
    title: 'Task Tracker',
    summary:
      'A to-do app with add, complete, delete, and filter.',
    description:
      'Tasks live in a single useState array. Adding, toggling, and deleting all produce a brand new array rather than mutating the existing one, which is what keeps React re-rendering reliably. A filter row switches between All / Active / Done views, and the remaining-task count updates from the same source of truth.',
    highlights: [
      'Immutable updates with spread and .map() / .filter()',
      'Toggle completion by id without mutating existing state',
      'All / Active / Done filter views',
      'Live remaining-task counter derived from state',
    ],
    tech: ['React', 'useState', 'Immutable Updates', 'Conditional Rendering'],
    role: 'Solo — practice project',
    year: '2026',
    status: 'Completed',
    link: 'https://github.com/rjtnchn',
    repo: 'https://github.com/rjtnchn',
    takeaway:
      'Mutating the array with .push() looked fine in the console but never re-rendered. That bug taught me why React compares references.',
  },
];

// Small helper so the lookup logic lives in one place.
// The String() cast matters: route params are strings, project ids are numbers.
export function getProjectById(id) {
  return projects.find((project) => String(project.id) === String(id));
}

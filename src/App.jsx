import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="app-shell">
      {/* Navbar and Footer live OUTSIDE <Routes>, so they are rendered once
          here and persist across every route change. Only the element matched
          inside <Routes> is swapped out when the URL changes. */}
      <Navbar />
      <ScrollToTop />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* TODO 2 (done) */}
          <Route path="/about" element={<About />} />
          {/* TODO 3 (done) */}
          <Route path="/projects" element={<Projects />} />
          {/* TODO 4 (done): ":id" is a URL parameter, read with useParams() */}
          <Route path="/projects/:id" element={<ProjectDetail />} />
          {/* TODO 5 (done) */}
          <Route path="/contact" element={<Contact />} />
          {/* TODO 6 (done): the catch-all MUST be declared last so that it only
              matches when no route above it matched. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

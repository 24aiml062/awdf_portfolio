import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';

// P8: Route-based code splitting using React.lazy
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <div className="app-container">
      <Header name="Parita Shah" />
      <NavBar />

      <Suspense fallback={<div style={{ padding: '20px', color: '#61dafb' }}>Loading page chunk...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;

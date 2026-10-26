import './App.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';

function App() {
  const mySkills = ['JavaScript', 'React', 'HTML5', 'CSS3', 'Python', 'Machine Learning'];

  return (
    <div className="app-container">
      <Header name="Parita Shah" />
      <About />
      <Skills skillList={mySkills} />
      <Footer />
    </div>
  );
}

export default App;

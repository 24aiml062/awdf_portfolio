import { useState } from 'react';
import About from '../components/About';
import Skills from '../components/Skills';

function Home() {
  const [showBioDetails, setShowBioDetails] = useState(false);
  const mySkills = ['JavaScript', 'React', 'HTML5', 'CSS3', 'Python', 'Machine Learning'];

  return (
    <div>
      <About />
      <Skills skillList={mySkills} />

      <section>
        <h2>Status & Interests</h2>
        <button onClick={() => setShowBioDetails(!showBioDetails)}>
          {showBioDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showBioDetails && (
          <p style={{ marginTop: '10px', color: '#a0a0a0' }}>
            Currently pursuing B.Tech in Artificial Intelligence & Machine Learning (Semester 5).
            Exploring React component architecture and modern full-stack development.
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;

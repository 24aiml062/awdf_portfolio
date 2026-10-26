import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchRepos = () => {
    setLoading(true);
    setError(null);
    fetch('https://api.github.com/users/24aiml062/repos')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch repositories (Status: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>GitHub Projects (24aiml062)</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Filter repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '60%', maxWidth: '350px' }}
        />
      </div>

      {loading && <Spinner />}

      {error && <ErrorMessage message={error} onRetry={fetchRepos} />}

      {!loading && !error && filteredRepos.length === 0 && (
        <p style={{ color: '#888' }}>No repositories found matching your query.</p>
      )}

      {!loading && !error && filteredRepos.length > 0 && (
        <ul>
          {filteredRepos.map((repo) => (
            <li key={repo.id} style={{ marginBottom: '12px' }}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#61dafb', textDecoration: 'none', fontWeight: 'bold' }}
              >
                {repo.name}
              </a>
              <span style={{ marginLeft: '10px', color: '#888' }}>
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </span>
              {repo.description && (
                <p style={{ margin: '4px 0 0 0', color: '#aaa', fontSize: '0.9rem' }}>
                  {repo.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Projects;

import { useState, useEffect } from 'react';
import About from '../components/About';
import Skills from '../components/Skills';
import { getTasks, createTask, updateTask, deleteTask, generateAiDescription } from '../api';

function Home() {
  const [showBioDetails, setShowBioDetails] = useState(false);
  const mySkills = ['JavaScript', 'React', 'HTML5', 'CSS3', 'Python', 'Machine Learning'];

  // P6: Full-stack Task Management
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // P13: AI Suggestion state
  const [aiLoading, setAiLoading] = useState(false);

  const loadTasks = () => {
    setLoading(true);
    setError(null);
    getTasks()
      .then((data) => setTasks(Array.isArray(data) ? data : []))
      .catch((err) => setError('Could not load tasks from backend: ' + err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createTask(newTitle.trim(), newDescription.trim())
      .then((task) => {
        setTasks((prev) => [...prev, task]);
        setNewTitle('');
        setNewDescription('');
      })
      .catch((err) => setError('Could not create task: ' + err.message));
  };

  const handleSuggestAi = () => {
    if (!newTitle.trim()) {
      alert('Please enter a task title first!');
      return;
    }
    setAiLoading(true);
    generateAiDescription(newTitle.trim())
      .then((data) => {
        if (data && data.description) {
          setNewDescription(data.description);
        }
      })
      .catch((err) => console.error('AI suggestion failed:', err))
      .finally(() => setAiLoading(false));
  };

  const handleToggle = (task) => {
    updateTask(task._id, { completed: !task.completed })
      .then((updated) => {
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      })
      .catch((err) => setError('Could not update task: ' + err.message));
  };

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t._id !== id));
      })
      .catch((err) => setError('Could not delete task: ' + err.message));
  };

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

      {/* P6 & P13: Full-Stack Task Management + AI Generation */}
      <section style={{ borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h2>Task Management (Full-Stack MongoDB & AI)</h2>
        {error && (
          <p style={{ color: '#ff6b6b', background: '#3b1212', padding: '10px', borderRadius: '4px' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', maxWidth: '500px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task title (e.g. Prepare Presentation)..."
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={handleSuggestAi}
              disabled={aiLoading}
              style={{ background: '#4a154b', border: '1px solid #7c2d82', whiteSpace: 'nowrap' }}
            >
              {aiLoading ? 'Thinking...' : '✨ Suggest AI'}
            </button>
          </div>

          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Task description (or generate using AI above)..."
          />

          <button type="submit" style={{ alignSelf: 'flex-start', background: '#238636' }}>
            Add Task
          </button>
        </form>

        {loading ? (
          <p style={{ color: '#61dafb' }}>Loading tasks from MongoDB...</p>
        ) : tasks.length === 0 ? (
          <p style={{ color: '#888' }}>No tasks found in the database. Add one above!</p>
        ) : (
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {tasks.map((task) => (
              <li
                key={task._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: '#1a1a1a',
                  marginBottom: '8px',
                  borderRadius: '4px',
                }}
              >
                <div>
                  <span
                    onClick={() => handleToggle(task)}
                    style={{
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#888' : '#e0e0e0',
                    }}
                  >
                    {task.completed ? '✓ ' : '○ '} {task.title}
                  </span>
                  {task.description && (
                    <p style={{ margin: '4px 0 0 20px', color: '#999', fontSize: '0.85rem' }}>
                      {task.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  style={{ background: '#731e1e', fontSize: '0.8rem', padding: '4px 8px' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Home;

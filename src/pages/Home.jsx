import { useState, useEffect } from 'react';
import About from '../components/About';
import Skills from '../components/Skills';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

function Home() {
  const [showBioDetails, setShowBioDetails] = useState(false);
  const mySkills = ['JavaScript', 'React', 'HTML5', 'CSS3', 'Python', 'Machine Learning'];

  // P6: Full-stack Task Management
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    createTask(newTitle.trim())
      .then((task) => {
        setTasks((prev) => [...prev, task]);
        setNewTitle('');
      })
      .catch((err) => setError('Could not create task: ' + err.message));
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

      {/* P6: Full-Stack Task Management Module */}
      <section style={{ borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h2>Task Management (Full-Stack MongoDB)</h2>
        {error && (
          <p style={{ color: '#ff6b6b', background: '#3b1212', padding: '10px', borderRadius: '4px' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter a new task..."
            style={{ flex: '1', maxWidth: '400px' }}
          />
          <button type="submit">Add Task</button>
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
                  padding: '8px 12px',
                  background: '#1a1a1a',
                  marginBottom: '8px',
                  borderRadius: '4px',
                }}
              >
                <span
                  onClick={() => handleToggle(task)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#888' : '#e0e0e0',
                  }}
                >
                  {task.completed ? '✓ ' : '○ '} {task.title}
                </span>
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

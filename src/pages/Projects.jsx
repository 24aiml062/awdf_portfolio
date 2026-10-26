function Projects() {
  const sampleProjects = [
    { id: 1, title: 'AI Portfolio Website', desc: 'Interactive React application with component-driven architecture.' },
    { id: 2, title: 'Task Manager API', desc: 'RESTful API with Node.js, Express, and MongoDB.' },
    { id: 3, title: 'Deep Learning Model Explorer', desc: 'Computer vision and NLP model visualization workbench.' }
  ];

  return (
    <div>
      <h2>Academic Projects</h2>
      <ul>
        {sampleProjects.map((p) => (
          <li key={p.id} style={{ marginBottom: '15px' }}>
            <strong>{p.title}</strong>
            <p style={{ margin: '4px 0', color: '#aaa' }}>{p.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;

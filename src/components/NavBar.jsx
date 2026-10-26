import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    marginRight: '15px',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    color: location.pathname === path ? '#61dafb' : '#e0e0e0',
    textDecoration: 'none',
  });

  return (
    <nav style={{ padding: '15px 0', borderBottom: '1px solid #333', marginBottom: '20px' }}>
      <Link to="/" style={linkStyle('/')}>Home</Link>
      <Link to="/projects" style={linkStyle('/projects')}>Projects</Link>
      <Link to="/contact" style={linkStyle('/contact')}>Contact</Link>
    </nav>
  );
}

export default NavBar;

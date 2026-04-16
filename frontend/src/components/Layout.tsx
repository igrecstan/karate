import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <header className="topbar">
        <Link to="/" className="brand">FI-ADEKASH</Link>
        <button onClick={logout}>Déconnexion</button>
      </header>
      <div className="shell">
        <aside className="sidebar">
          <NavLink to="/">Clubs</NavLink>
          <NavLink to="/messages">Messages</NavLink>
          <NavLink to="/events">Évènements</NavLink>
          <NavLink to="/documents">Documents</NavLink>
        </aside>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}

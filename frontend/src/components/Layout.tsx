import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div>
      <header className="topbar">
        <Link to="/admin" className="brand">FI-ADEKASH</Link>
        <button onClick={logout}>Déconnexion</button>
      </header>
      <div className="shell">
        <aside className="sidebar">
          <NavLink to="/admin">Clubs</NavLink>
          <NavLink to="/admin/messages">Messages</NavLink>
          <NavLink to="/admin/events">Évènements</NavLink>
          <NavLink to="/admin/documents">Documents</NavLink>
        </aside>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}

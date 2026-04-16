import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="login-wrap">
      <div className="card" style={{ maxWidth: 680 }}>
        <h1>Bienvenue sur FI-ADEKASH</h1>
        <p>
          Ceci est la page d&apos;accueil publique. L&apos;espace d&apos;administration est
          accessible uniquement après authentification.
        </p>
        <p style={{ marginTop: 12 }}>
          <Link to="/admin/login">Accéder à l&apos;espace admin</Link>
        </p>
      </div>
    </div>
  );
}

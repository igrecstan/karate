import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function LoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch {
      setError('Connexion échouée');
    }
  };

  return (
    <div className="login-wrap">
      <form className="card" onSubmit={onSubmit}>
        <h1>Connexion admin</h1>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Utilisateur" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" type="password" />
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

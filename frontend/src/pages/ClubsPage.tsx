import { FormEvent, useEffect, useState } from 'react';
import { createResource, getResource } from '../api';
import type { Club } from '../types';

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [name, setName] = useState('');
  const [manager, setManager] = useState('');

  const load = () => getResource<Club>('clubs').then(setClubs).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createResource<Club>('clubs', { name, manager });
    setName('');
    setManager('');
    load();
  };

  return (
    <section>
      <h2>Clubs</h2>
      <form className="inline-form" onSubmit={onSubmit}>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nom du club" required />
        <input value={manager} onChange={(event) => setManager(event.target.value)} placeholder="Responsable" required />
        <button type="submit">Ajouter</button>
      </form>
      <table>
        <thead><tr><th>Nom</th><th>Responsable</th><th>Ville</th><th>Grade</th></tr></thead>
        <tbody>
          {clubs.map((club) => (
            <tr key={club.id}><td>{club.name}</td><td>{club.manager}</td><td>{club.city}</td><td>{club.grade}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

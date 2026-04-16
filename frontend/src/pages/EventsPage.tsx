import { FormEvent, useEffect, useState } from 'react';
import { createResource, getResource } from '../api';
import type { EventItem } from '../types';

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const load = () => getResource<EventItem>('events').then(setEvents).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createResource<EventItem>('events', { name, date });
    setName('');
    setDate('');
    load();
  };

  return (
    <section>
      <h2>Évènements</h2>
      <form className="inline-form" onSubmit={onSubmit}>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nom" required />
        <input value={date} onChange={(event) => setDate(event.target.value)} type="date" required />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {events.map((item) => (
          <li key={item.id}>{item.name} — {item.date} ({item.location ?? 'NC'})</li>
        ))}
      </ul>
    </section>
  );
}

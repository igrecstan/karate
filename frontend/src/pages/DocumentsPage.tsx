import { FormEvent, useEffect, useState } from 'react';
import { createResource, getResource } from '../api';
import type { DocumentItem } from '../types';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const load = () => getResource<DocumentItem>('documents').then(setDocuments).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createResource<DocumentItem>('documents', { title, url });
    setTitle('');
    setUrl('');
    load();
  };

  return (
    <section>
      <h2>Documents</h2>
      <form className="inline-form" onSubmit={onSubmit}>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Titre" required />
        <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="URL" required />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {documents.map((document) => (
          <li key={document.id}><a href={document.url}>{document.title}</a></li>
        ))}
      </ul>
    </section>
  );
}

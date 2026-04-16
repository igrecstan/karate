import { useEffect, useState } from 'react';
import { deleteResource, getResource, updateResource } from '../api';
import type { MessageItem } from '../types';

export default function MessagesPage() {
  const [items, setItems] = useState<MessageItem[]>([]);

  const load = () => getResource<MessageItem>('messages').then(setItems).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: number) => {
    await updateResource(`messages/${id}`, { read: true });
    load();
  };

  const remove = async (id: number) => {
    await deleteResource(`messages/${id}`);
    load();
  };

  return (
    <section>
      <h2>Messages</h2>
      <ul className="message-list">
        {items.map((message) => (
          <li key={message.id} className={message.read ? 'message read' : 'message'}>
            <div>
              <strong>{message.name}</strong> — {message.message}
            </div>
            <div className="actions">
              {!message.read && <button onClick={() => markRead(message.id)}>Marquer lu</button>}
              <button onClick={() => remove(message.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

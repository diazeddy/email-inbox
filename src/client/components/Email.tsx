// src/components/Email.tsx
import React from 'react';
import axios from 'axios';

interface EmailProps {
  id: number;
  title:string;
  content: string;
  is_read: boolean;
  is_trashed: boolean;
  thread_id: number;
  onStatusChange: () => void;
}

const Email: React.FC<EmailProps> = ({ id, title, content, is_read, is_trashed, thread_id, onStatusChange }) => {
  const markAsRead = async () => {
    await axios.patch(`http://localhost:3000/api/emails/${id}/read`);
    onStatusChange();
  };

  const markAsUnread = async () => {
    await axios.patch(`http://localhost:3000/api/emails/${id}/unread`);
    onStatusChange();
  };

  const moveToTrash = async () => {
    await axios.patch(`http://localhost:3000/api/emails/${id}/trash`);
    onStatusChange();
  };

  const recoverFromTrash = async () => {
    await axios.patch(`http://localhost:3000/api/emails/${id}/recover`);
    onStatusChange();
  };

  return (
    <div className={`email ${is_read ? 'read' : 'unread'} ${is_trashed ? 'in-trash' : ''}`}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <button onClick={is_read ? markAsUnread : markAsRead}>{is_read ? 'Mark as Unread' : 'Mark as Read'}</button>
      <button onClick={is_trashed ? recoverFromTrash : moveToTrash}>{is_trashed ? 'Recover' : 'Move to Trash'}</button>
    </div>
  );
};

export default Email;
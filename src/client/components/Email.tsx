import React from 'react';
import axios from 'axios';

interface EmailProps {
    id: number;
    title:string;
    content: string;
    is_read: boolean;
    is_trashed: boolean;
    onStatusChange: () => void;
}

const Email: React.FC<EmailProps> = ({ id, title, content, is_read, is_trashed, onStatusChange }) => {
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
        <div className={`p-4 border rounded ${is_read ? 'bg-gray-200' : 'bg-white'} ${is_trashed ? 'opacity-50' : ''}`}>
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: content }} />
            <div className="mt-2 flex space-x-2">
                <button onClick={is_read ? markAsUnread : markAsRead} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">{is_read ? 'Mark as Unread' : 'Mark as Read'}</button>
                <button onClick={is_trashed ? recoverFromTrash : moveToTrash} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">{is_trashed ? 'Recover' : 'Move to Trash'}</button>
            </div>
        </div>
    );
};

export default Email;
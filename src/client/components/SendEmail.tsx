import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

const SendEmail: React.FC = () => {
    const [receiverEmail, setReceiverEmail] = useState('');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const { auth } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post(
            'http://localhost:3000/api/emails',
            { receiverEmail, title, content },
            { headers: { Authorization: auth } }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <h1>Send Email</h1>
            <div>
                <label>To</label>
                <input type="email" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
                <label>Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required></textarea>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Send</button>
        </form>
    );
}

export default SendEmail;
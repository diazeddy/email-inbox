import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { Link } from "react-router-dom";

export interface Email {
    id: number;
    title:string;
    sender_id: number;
    receiver_id: number;
    thread_id: number;
    content: string;
    is_read: boolean;
    is_trashed: boolean;
    created_at: Date;
}

const Inbox:React.FC = () => {
    const { auth } = useContext(AuthContext);
    const [emails, setEmails] = useState<Email[]>([]);

    useEffect(() => {
        const fetchEmails = async () => {
            const response = await axios.get('http://localhost:3000/api/emails', {
                headers: { Authorization: auth }
            });
            setEmails(response.data);
        };
        fetchEmails();
    }, [auth]);

    return (
        <div>
            <h1>Inbox</h1>
            <Link to="/send">Send Email</Link>
            <ul>
                {emails.map((email) => (
                <li key={email.id}>
                    <Link to={`/email/${email.id}`}>{email.title}</Link>
                </li>
                ))}
            </ul>  
        </div>
    );
}

export default Inbox;
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { Link } from "react-router-dom";
import Search from "./Search";
import Filter from "./Filter";
import Email from "./Email";
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
    const [filter, setFilter] = useState('all');

    const fetchFilteredEmails = async () => {
        const response = await axios.get(`http://localhost:3000/api/emails?filter=${filter}`);
        setEmails(response.data);
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        fetchFilteredEmails();
    };

    const handleSearchResults = (results: any[]) => {
        setEmails(results);
    };

    const fetchEmails = async () => {
        const response = await axios.get('http://localhost:3000/api/emails', {
            headers: { Authorization: auth }
        });
        setEmails(response.data);
    };

    useEffect(() => {
        fetchEmails();
    }, [auth]);

    return (
        <div>
            <h1>Inbox</h1>
            <Link to="/send">Send Email</Link>
            <Search onSearchResults={handleSearchResults} />
            <Filter onFilterChange={handleFilterChange} />
            {emails.map((email) => (
                <Link key={email.id} to={`/email/${email.id}`}>
                    <Email
                        key={email.id}
                        {...email}
                        onStatusChange={fetchEmails}
                    />
                </Link>
            ))}
        </div>    
    );
}

export default Inbox;
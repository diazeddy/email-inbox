import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useParams } from "react-router-dom";
import { Email } from "./Inbox";

const EmailView: React.FC = () => {
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [email, setEmail] = useState<Email | null>(null);

    useEffect(() => {
        const fetchEmail = async () => {
            const response = await axios.get(`http://localhost:3000/api/emails/${id}`, {
                headers: { Authorization: auth }
            });
            setEmail(response.data);
        };
        fetchEmail();
    }, [id, auth]);
    
    if (!email) return <div>Loading...</div>;

    return (
        <div>
            <h1>{email.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: email.content }}></div>
        </div>
    );
}

export default EmailView;
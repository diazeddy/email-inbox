import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useParams } from "react-router-dom";
import { Email } from "./Inbox";

const EmailView: React.FC = () => {
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [email, setEmail] = useState<Email | null>(null);
    const [replyContent, setReplyContent] = useState<string>("");

    useEffect(() => {
        const fetchEmail = async () => {
            const response = await axios.get(`http://localhost:3000/api/emails/${id}`, {
                headers: { Authorization: auth }
            });
            setEmail(response.data);
        };
        fetchEmail();
    }, [id, auth]);

    const replyToEmail = async () => {
        await axios.post(`http://localhost:3000/api/emails/${id}/reply`, {
            threadId: email?.thread_id || email?.id,
            content: replyContent
        });
        setReplyContent('');
    };

    if (!email) return <div>Loading...</div>;

    return (
        <div>
            <h2>{email.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: email.content }} />
            <div>
            <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply here"
            />
            <button onClick={replyToEmail}>Reply</button>
            </div>
        </div>
    );
}

export default EmailView;
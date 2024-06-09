import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../AuthProvider';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/register', { email, password });
            await login(email, password);
            navigate('/inbox');
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <h1>Register</h1>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Register</button>
        </form>
    );
};

export default Register;
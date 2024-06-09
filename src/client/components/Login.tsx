import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await login(email, password);
        navigate('/inbox');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <h1>Login</h1>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Login</button>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </form>
    );
};

export default Login;
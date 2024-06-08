import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@hometask.com$/;

        return pattern.test(email);
    }


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // try {
        //     if (validateEmail(username)) {
        //         const response = await login(username, password);
        //         localStorage.setItem('token', response.data.token);
        //         navigate('/dashboard');
        //     } else {
        //         alert('Email should be ended with "@hometask.com".')
        //     }
        // } catch (error) {
        //     console.error('Error logging in:', error);
        // }
        await login(email, password);
        navigate('/inbox');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </form>
    );
};

export default Login;
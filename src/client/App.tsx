import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Register from './components/Register';
import Inbox from './components/Inbox';
import EmailView from './components/EmailView';
import SendEmail from './components/SendEmail';
import AuthProvider from './AuthProvider';

import "./App.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/email/:id" element={<EmailView />} />
          <Route path="/send" element={<SendEmail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

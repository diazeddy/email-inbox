import React, { Component, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, RouteProps } from 'react-router-dom';
import Login from "./components/Login";
import Register from './components/Register';
import Inbox from './components/Inbox';
import EmailView from './components/EmailView';
import SendEmail from './components/SendEmail';
import AuthProvider, { AuthContext } from './AuthProvider';

import "./App.css";

// const App: React.FC = () => {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// interface PrivateRouteProps extends RouteProps {
//   component: React.ComponentType<any>;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
//   const { auth } = useContext(AuthContext);
//   return (
//     <Route 
//       {...rest}
//       render={(props) =>
//         auth ? <Component {...props} /> : <Link to="/login">Login</Link>
//       }
//     />
//   );
// };

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
          {/* <Link to="/login" /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

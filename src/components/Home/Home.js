import React from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const { logout, user } = useAuth();
    const history = useHistory();
    const handleLogOut = (e) => {
        e.preventDefault();
        logout();
        history.push('/');
    }

    return (
        <div>
            <h1>Welcome Home {user?.displayName}</h1>
            <button onClick={handleLogOut} >Log out</button>
        </div>
    );
};

export default Home;
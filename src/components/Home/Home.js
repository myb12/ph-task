import React from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const { loggedInUserFromDB } = useAuth();

    return (
        <div>
            <Navigation />
            <h1>Welcome Home {loggedInUserFromDB?.displayName}</h1>
            <img src={loggedInUserFromDB?.profilePic} alt="" />
        </div>
    );
};

export default Home;
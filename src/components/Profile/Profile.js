import React from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import useAuth from '../../hooks/useAuth'
import { Box } from '@mui/material';
import './Profile.css';


const Profile = () => {
    const { loggedInUserFromDB } = useAuth();
    return (
        <>
            <Navigation />
            <Box className="profile-container">
                <Box className="profile ">
                    <Box>
                        <img src={loggedInUserFromDB.profilePic} alt="img" className="profile-img" />
                        <h3 className="profile-title">
                            {loggedInUserFromDB.displayName}
                        </h3>
                        <span>{loggedInUserFromDB.userType}</span>
                        <p>{loggedInUserFromDB.email}</p>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Profile;
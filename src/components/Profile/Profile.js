import React from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import useAuth from '../../hooks/useAuth'
import { Box, Typography } from '@mui/material';


const Profile = () => {
    const { loggedInUserFromDB } = useAuth();
    return (
        <>
            <Navigation />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Box>
                    <img src={loggedInUserFromDB?.profilePic} alt="" />
                    <Typography sx={{ textAlign: 'center' }} variant="h6"> {loggedInUserFromDB?.displayName}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default Profile;
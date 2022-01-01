import React from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
import './Home.css'

const Home = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push('/join-us');
    }
    return (
        <>
            <Navigation />
            <Box className="banner-container" style={{ backgroundColor: 'cyan' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" sx={{ color: '#f6830d', fontWeight: 'bold' }}>
                        Hero Rider!
                    </Typography>

                    <Typography sx={{ color: '#f6830d', fontSize: 20, fontWeight: 300, marginTop: 2, textAlign: 'center' }}>
                        FOCUSED ON SAFETY, WHEREVER YOU GO! <br />
                        WE CONNECT DRIVERS & PASSENGERS
                    </Typography>

                    <Button onClick={handleClick} className="join-btn">
                        Join Us
                    </Button>
                </Container>
            </Box>
        </>
    );
};

export default Home;
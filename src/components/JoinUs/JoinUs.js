import {
    Alert,
    Button,
    Grid,
    Typography
} from "@mui/material";
import "../Login/Login.css";
import { useHistory } from "react-router";
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth'
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import Navigation from "../Shared/Navigation/Navigation";
import AsRider from "./AsRider/AsRider";
import axios from "axios";


export default function JoinUs() {
    const { registerUser, authError } = useAuth();
    const history = useHistory();
    const [userType, setUserType] = useState('Rider');
    const [userData, setUserData] = useState({});



    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newUserData = { ...userData };
        newUserData[field] = value;
        setUserData(newUserData);
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        registerUser(userData.email, userData.password, userData.name, history, userData);
    }

    const handleType = (type) => {
        setUserType(type);
    }

    const handleImageUpload = e => {
        const field = e.target.name;
        const newUserData = { ...userData };


        const imageData = new FormData();
        imageData.set('key', 'e41d40fb3f55feb7953d2b40ad1591f1');
        imageData.append('image', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(res => {
                newUserData[field] = res.data.data.display_url;
                setUserData(newUserData);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    console.log(userData);
    return (
        <>
            <Navigation />
            <Box style={{ marginTop: 50, marginBottom: 20 }}>

                <Box className="App">
                    <Box sx={{ mb: 2 }}>
                        <Button
                            sx={{ borderBottom: userType === 'Rider' && '2px solid #1976d2' }} onClick={() => handleType('Rider')}
                        >
                            Join as Rider
                        </Button>
                        <Button
                            sx={{ borderBottom: userType === 'Learner' && '2px solid #1976d2' }}
                            onClick={() => handleType('Learner')}
                        >
                            Join as Learner
                        </Button>

                    </Box>
                    <Grid container className="login-box">
                        <Grid item sm={12} md={3}></Grid>
                        <Grid item sm={12} md={6} className="form-box">
                            <Typography variant="h4" className="heading">
                                Join as {userType}
                            </Typography>
                            <Box className="divider" />

                            {/* to join as a rider */}
                            {
                                userType === 'Rider' && <AsRider
                                    handleOnBlur={handleOnBlur}
                                    handleSignUp={handleSignUp}
                                    handleImageUpload={handleImageUpload}
                                />
                            }


                            {/* to join as a Driving Lesson Learner*/}

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Already registered? <Link to="/login">Login</Link> here
                            </Typography>
                            <Box className="or-section">
                                <Box className="or-divider" />
                                <Typography variant="h5">Or</Typography>
                                <Box className="or-divider" />
                            </Box>
                            {
                                authError && <Alert severity="error" sx={{ mt: 2 }}>{authError}</Alert>
                            }
                        </Grid>
                        <Grid item sm={12} md={3}></Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
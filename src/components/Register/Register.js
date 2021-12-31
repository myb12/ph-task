import {
    Alert,
    Button,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import "../Login/Login.css";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router";
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth'
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function Register() {

    const { registerUser, authError } = useAuth();
    const history = useHistory();
    const [loginData, setLoginData] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        registerUser(loginData.email, loginData.password, loginData.name, history);
    }


    return (
        <Box style={{ marginTop: 100 }}>
            <div className="App">
                <Grid container className="login-box">
                    <Grid item sm={12} md={3}></Grid>
                    <Grid sm={12} md={6} className="form-box">
                        <Typography variant="h4" className="heading">
                            Please Register
                        </Typography>
                        <div className="divider" />

                        <form onSubmit={handleSignUp}>
                            <TextField
                                required
                                className="inputFields"
                                label="Name"
                                name="name"
                                variant="standard"
                                InputProps={{
                                    // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FaUserAlt />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ mt: 2 }}
                                onBlur={handleOnBlur}
                            />

                            <TextField
                                required
                                className="inputFields"
                                label="Email address"
                                name="email"
                                type="email"
                                variant="standard"
                                InputProps={{
                                    // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <MdEmail />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ mt: 2 }}
                                onBlur={handleOnBlur}
                            />
                            <TextField
                                required
                                type="password"
                                className="inputFields"
                                label="Password"
                                variant="standard"
                                name="password"
                                InputProps={{
                                    // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FaLock />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ mt: 2 }}
                                onBlur={handleOnBlur}
                            />
                            <Button type="submit" className="inputFields btn-regular" sx={{ mt: 2 }}>
                                Sign up
                            </Button>
                        </form>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Already registered? <Link to="/login">Login</Link> here
                        </Typography>
                        <div className="or-section">
                            <div className="or-divider" />
                            <Typography variant="h5">Or</Typography>
                            <div className="or-divider" />
                        </div>
                        <Button variant="outlined" className="continue-with-button">
                            Continue with<FcGoogle style={{ marginLeft: 5 }} />
                        </Button>
                        {
                            authError && <Alert severity="error" sx={{ mt: 2 }}>{authError}</Alert>
                        }
                    </Grid>
                    <Grid item sm={12} md={3}></Grid>
                </Grid>
            </div></Box>
    );
}
import {
    Alert,
    Button,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/system";

export default function Login() {

    const { loginUser, authError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const location = useLocation();


    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        loginUser(email, password, location, history)
    }

    return (
        <Box style={{ marginTop: 100, marginBottom: 20 }}>

            <div className="login-container">
                <Grid container className="login-box">
                    <Grid item sm={12} md={3}></Grid>
                    <Grid sm={12} md={6} className="form-box">
                        <Typography variant="h4" className="heading">
                            Login
                        </Typography>
                        <div className="divider" />

                        <form onSubmit={handleSignIn}>
                            <TextField
                                required
                                type="email"
                                onBlur={handleEmailChange}
                                className="inputFields"
                                label="Email address"
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
                            />
                            <TextField
                                required
                                type="password"
                                onBlur={handlePasswordChange}
                                className="inputFields"
                                label="Password"
                                variant="standard"
                                InputProps={{
                                    // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FaLock />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ mt: 2 }}
                            />

                            <Button type="submit" className="inputFields btn-regular" sx={{ mt: 2 }}>
                                Login
                            </Button>
                        </form>

                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Don't have an account? <Link to="/register">Register</Link> here
                        </Typography>
                        <div className="or-section">
                            <div className="or-divider" />
                            <Typography variant="h5">Or</Typography>
                            <div className="or-divider" />
                        </div>
                        {
                            authError && <Alert severity="error" sx={{ mt: 2 }}>{authError}</Alert>
                        }

                    </Grid>
                    <Grid item sm={12} md={3}></Grid>
                </Grid>
            </div>
        </Box>
    );
}
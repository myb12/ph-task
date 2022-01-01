import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useAuth from '../../../hooks/useAuth';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';


const activeStyle = {
    borderBottom: '2px solid #fff',
}

const Navigation = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, logout, loggedInUserFromDB } = useAuth();
    const history = useHistory();


    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    // };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = (e) => {
        e.preventDefault();
        logout();
        setAnchorEl(null);
    }

    const handleNavigate = (location) => {
        history.push(location);
        handleClose();
    }

    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                        <NavLink to="/" style={{ textDecoration: 'none', color: '#fff', marginRight: 16 }} activeStyle={activeStyle}>
                            Home
                        </NavLink>

                        {
                            user.email && <NavLink to="/dashboard" style={{ textDecoration: 'none', color: '#fff' }} activeStyle={activeStyle}>
                                Dashboard
                            </NavLink>
                        }
                    </Typography>
                    {loggedInUserFromDB?.email ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => handleNavigate('profile')}>
                                    <img src={loggedInUserFromDB?.profilePic} alt="" style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 3 }} />
                                    {loggedInUserFromDB?.displayName}
                                </MenuItem>
                                <MenuItem onClick={() => handleNavigate('profile')}>Profile</MenuItem>
                                <MenuItem onClick={() => handleNavigate('home')}>Back to home</MenuItem>
                                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                            </Menu>
                        </div>
                    ) : <Button variant="text" sx={{ color: '#fff' }} onClick={() => handleNavigate('join-us')}>Please Join Us</Button>}
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default Navigation; 
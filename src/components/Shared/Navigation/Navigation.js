import React, { useEffect, useState } from 'react';
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
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
const Navigation = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout, user, loggedInUserFromDB } = useAuth();
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

    const handleJoinUs = () => {
        history.push('/join-us');
    }

    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                            Hero Rider
                        </Link>
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
                                <MenuItem onClick={handleClose}>
                                    <img src={loggedInUserFromDB?.profilePic} alt="" style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 3 }} />
                                    {loggedInUserFromDB?.displayName}
                                </MenuItem>
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                            </Menu>
                        </div>
                    ) : <Button variant="text" sx={{ color: '#fff' }} onClick={handleJoinUs}>Please Join Us</Button>}
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default Navigation; 
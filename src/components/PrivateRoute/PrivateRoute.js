import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Route, Redirect } from 'react-router-dom';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                <CircularProgress style={{ color: '#c39052' }} />
            </Box>
        )
    };
    return (
        <Route
            {...rest}
            render={({ location }) => user.email ? children : <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            ></Redirect>}
        >

        </Route>
    );
};

export default PrivateRoute;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import useAuth from '../../../../hooks/useAuth';
import { Box } from '@mui/system';

const AdminRoute = ({ children, ...rest }) => {
    const { user, isLoading, admin } = useAuth();

    if (isLoading || !admin) {
        return (
            <Box style={{ display: 'flex', justifyContent: 'center', }}>
                <CircularProgress style={{ color: '#f6830d' }} />
            </Box>
        )
    };
    return (
        <Route
            {...rest}
            render={({ location }) => user.email && admin ? children : <Redirect
                to={{
                    pathname: "/home",
                    state: { from: location }
                }}
            ></Redirect>}
        >

        </Route>
    );
};

export default AdminRoute;
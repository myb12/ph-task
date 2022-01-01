import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Alert, Button, Card, CardContent, Container, Grid } from '@mui/material';
import { Switch, Route, Link, useRouteMatch, useHistory, useLocation, NavLink } from "react-router-dom";
import { MdDashboardCustomize, MdPayment, } from 'react-icons/md';
import { useState } from 'react';
import { BsMinecartLoaded } from 'react-icons/bs';
import { AiOutlineCloseCircle, AiOutlineRollback } from 'react-icons/ai';
import { GoWatch } from 'react-icons/go';
import useAuth from '../../hooks/useAuth';
import AdminRoute from './Admin/AdminRoute/AdminRoute';
import './Dashboard.css';
import ManageAllUsers from './Admin/ManageAllUsers/ManageAllUsers';
import PricingCard from './User/PricingCard';
import plans from '../../assets/data/plans.json';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 280;

function Dashboard(props) {
    const { logout, admin, user } = useAuth()
    const { window } = props;
    const history = useHistory();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const isTab = useMediaQuery('(max-width:990px)');
    const [message, setMessage] = useState('');

    let { path, url } = useRouteMatch();
    const dashboardPageUrl = location.pathname.split('/dashboard/')[1];
    const notDashboardUrl = location.pathname.split('/')[2];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const handleLogOut = (e) => {
        e.preventDefault();
        logout();
        history.push('/');
    }

    const drawer = (
        <div>
            <List style={{ padding: "0" }}>
                <Button color="inherit" style={{ width: "100%", justifyContent: "start", }}>
                    <Link to="/" className="dashboard-item">
                        <span className="dashboard-item-content">
                            <AiOutlineRollback style={{ marginRight: 10, }} />
                            Back to home
                        </span>
                    </Link>
                </Button>
            </List>

            <Divider />
            {
                admin ?
                    <>
                        <List style={{ padding: "0" }}>
                            <Button color="inherit" style={{ width: "100%", justifyContent: "start", }}>
                                <Link to="/dashboard" className="dashboard-item" style={{ width: "100%", borderLeft: !dashboardPageUrl && '2px solid #1976d2' }}>
                                    <span className="dashboard-item-content">
                                        <MdDashboardCustomize style={{ marginRight: 10, }} />
                                        Dashboard
                                    </span>
                                </Link>
                            </Button>
                        </List>

                        <List style={{ padding: "0" }}>
                            <Button color="inherit" style={{ width: "100%", justifyContent: "start", }}>
                                <Link to={`${url}/manageAllUsers`} className="dashboard-item" style={{ width: "100%", borderLeft: dashboardPageUrl === 'manageAllUsers' && '2px solid #1976d2' }}>
                                    <span className="dashboard-item-content">
                                        <BsMinecartLoaded style={{ marginRight: 10, }} />
                                        Manage all Users
                                    </span>
                                </Link>
                            </Button>
                        </List>
                    </>
                    :
                    <>
                        <List style={{ padding: "0" }}>
                            <Button color="inherit" style={{ width: "100%", justifyContent: "start", }}>
                                <Link to="/dashboard" className="dashboard-item" style={{ width: "100%", borderLeft: !dashboardPageUrl && '2px solid #1976d2' }}>
                                    <span className="dashboard-item-content">
                                        <MdDashboardCustomize style={{ marginRight: 10, }} />
                                        Dashboard
                                    </span>
                                </Link>
                            </Button>
                        </List>
                        <List style={{ padding: "0" }}>
                            <Button color="inherit" style={{ width: "100%", justifyContent: "start", }}>
                                <Link to={`${url}/pay`} className="dashboard-item" style={{ width: "100%", borderLeft: dashboardPageUrl === 'pay' && '2px solid #1976d2' }}>
                                    <span className="dashboard-item-content">
                                        <MdPayment style={{ marginRight: 10, }} />
                                        Pay
                                    </span>
                                </Link>
                            </Button>
                        </List>
                    </>
            }

        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', }} >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ backgroundColor: '#1976d2' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <NavLink to="/dashboard" style={{ textDecoration: 'none', color: '#fff' }} activeStyle={{ borderBottom: '2px solid #fff' }}>
                        Dashboard
                    </NavLink>

                    <a href="/" onClick={handleLogOut} className="dashboard-nav-item">Log out</a>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Switch>
                    {/* Routes for normal user */}
                    <Route path={`${path}/pay`}>
                        <Box>
                            <h1>This is Pay </h1>
                        </Box>
                    </Route>
                    {/* <Route path={`${path}/user-dashboard`}>

                    </Route> */}
                    {/* Routes for admin */}
                    <AdminRoute path={`${path}/manageAllUsers`}>
                        <ManageAllUsers />
                    </AdminRoute>

                </Switch>


                {
                    admin && !notDashboardUrl && <>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box>
                                <Typography variant="h5">Hello <span style={{ fontWeight: 700, color: '#f6830d' }}>{user.displayName}!</span></Typography>
                                <Typography variant="h6" style={{ textAlign: 'center' }}>Welcome to the Dashboard.</Typography>
                            </Box>
                        </Box>

                        <Container maxWidth="md" sx={{ mt: 6 }} className="dashboard-content">
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <Card variant="outlined" style={{ height: 250 }}>
                                        <CardContent>
                                            <Typography style={{ fontSize: 45, fontWeight: 700 }} component="div">
                                                10
                                            </Typography>
                                            <Typography variant="h6" sx={{ mb: 1.5 }} >
                                                Card 1
                                            </Typography>

                                        </CardContent>
                                        <GoWatch style={{ fontSize: 100, color: '#00000026' }} />
                                    </Card>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Card variant="outlined" style={{ height: 250 }}>
                                        <CardContent>
                                            <Typography style={{ fontSize: 45, fontWeight: 700 }} component="div">
                                                20
                                            </Typography>
                                            <Typography variant="h6" sx={{ mb: 1.5 }}>
                                                Card 2
                                            </Typography>

                                        </CardContent>
                                        <BsMinecartLoaded style={{ fontSize: 100, color: '#00000026' }} />
                                    </Card>
                                </Grid>

                            </Grid>
                        </Container>
                    </>
                }

                {
                    !admin && !notDashboardUrl && <>
                        <Typography variant="h4" className="heading">
                            Our Plans
                        </Typography>
                        {
                            message && <Alert severity="success" sx={{ mt: 2, cursor: 'pointer' }} onClick={() => setMessage('')}>
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                    {message}
                                    <AiOutlineCloseCircle style={{ marginLeft: 5, color: '#bdbdbd', fontSize: 18 }} />
                                </Box>
                            </Alert>
                        }

                        <Box sx={{ mt: 2, display: 'flex', flexDirection: isTab && 'column' }}>
                            {
                                plans.map((plan, i) => <PricingCard key={i} plan={plan} setMessage={setMessage} />)
                            }

                        </Box>

                    </>
                }



            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
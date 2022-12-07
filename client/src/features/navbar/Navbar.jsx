import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import UserButtonBox from './UserButtonBox';
import AuthButtonsBox from './AuthButtonsBox';
// import logo from "../assets/logo.png";


function Navbar() {
    const { isAuth } = useSelector(state => state.auth);

    return (
        <AppBar position="sticky" color="default" sx={{ borderTop: 3, borderColor: '#424242' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' }, alignItems: 'center', position: 'fixed' }}>
                            <Box component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
                                {/* <Box component="img" src={logo} alt="logo" sx={{ width: 40, height: 40, mx: 0.5, pb: 0.5 }} /> */}
                                <Typography noWrap variant="h5">chronos</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
                            <Box component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
                                {/* <Box component="img" src={logo} alt="logo" sx={{ width: 40, height: 40, mx: 0.5, pb: 0.5 }} /> */}
                                <Typography noWrap variant="h5">chronos</Typography>
                            </Box>
                        </Box>
                        {isAuth ?
                            <UserButtonBox />
                            :
                            <AuthButtonsBox />
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default Navbar;
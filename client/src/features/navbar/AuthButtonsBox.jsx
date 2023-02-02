import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";


function AuthButtonsBox() {
    return (
        <Box sx={{ display: { xs: 'flex' } }}>
            <Box
                component={Link}
                to="/login"
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    my: 2,
                    mr: 1.5
                }}
            >
                <Button
                    sx={{
                        display: 'block',
                        border: '1px solid #acacac',
                        color: 'inherit',
                        backgroundColor: '#e0e0e0'
                    }}
                >
                    <Typography noWrap>Log In</Typography>
                </Button>
            </Box>
            <Box
                component={Link}
                to="/signup"
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    my: 2
                }}
            >
                <Button variant="contained" color="mono" sx={{ display: 'block' }}>
                    <Typography noWrap>Sign Up</Typography>
                </Button>
            </Box>
        </Box >
    );
}

export default AuthButtonsBox;
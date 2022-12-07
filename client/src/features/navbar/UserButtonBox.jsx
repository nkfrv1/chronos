import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import UserService from "../../api/UserService";


const getUserPic = async (userId) => {
    const user = await UserService.getOne(userId);
    if (user.userpic) {
        return `${import.meta.env.VITE_SERVER_URL}/${user.profpic}`;
    }
} 

function UserButtonBox() {
    const options = [
        {
            name: 'Profile',
            path: '#'
        },
        {
            name: 'Logout',
            path: '/logout'
        }
    ];

    const { user } = useSelector(state => state.auth);
    const [userpic, setUserPic] = useState();

    useEffect(() => {
        getUserPic(user.id).then(userpic => setUserPic(userpic));
    }, [user]);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={userpic} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {options.map(option => (
                    <Link key={option.name} to={option.path} style={{ textDecoration: 'none', color: 'initial' }}>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{option.name}</Typography>
                        </MenuItem>
                    </Link>
                ))}
            </Menu>
        </Box>
    );
}

export default UserButtonBox;
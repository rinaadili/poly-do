import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { setUser } from '../../store/slice/user.slice';

import Avatar from '@mui/material/Avatar';

import AvatarIcon from '../../assets/images/avatar.png';

export const AccountMenu = (props) => {
    
    let history = useHistory()
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.clear();
        dispatch(setUser({ 
            user: null,
            token: '',
        }));
        history.push('/');
    }

    return <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
                <div onClick={handleClick} className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                    <Avatar alt={`${props.user?.firstName} ${props.user?.lastName}`} src={AvatarIcon} />
                    <span>{props.user?.firstName} {props.user?.lastName}</span>
                </div>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
                <Link to={'/profile'}>Profile</Link>
            </MenuItem>
            <MenuItem onClick={() => logout()}>
                Logout
            </MenuItem>
        </Menu>
    </>
}
import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

import toast from 'react-hot-toast';
import { updateUserDetails } from '../../../services/Auth/auth.services';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ProfileDialog = (props) => {
    
    const [ userDetails, setUserDetails ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        department: '',
        phone_number: '',
        position: '',
    })

    useEffect(() => {
        setUserDetails({
            firstName: props?.user?.firstName,
            lastName: props?.user?.lastName,
            email: props?.user?.email,
            department: props.user.department,
            location: props.user.location,
            phone_number: props.user.phoneNumber,
            position: props.user.position,
        })
    }, [])

    const changeValue = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        })
    }

    return <>
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField 
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="First Name"
                    variant="standard"
                    name="firstName"
                    defaultValue={userDetails.firstName}
                    onChange={changeValue} />
                <TextField 
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Last Name"
                    variant="standard"
                    name="lastName"
                    defaultValue={userDetails.lastName}
                    onChange={changeValue} />
                <TextField 
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    name="email"
                    defaultValue={userDetails.email}
                    onChange={changeValue} />
                <TextField 
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Location"
                    variant="standard"
                    name="location"
                    defaultValue={userDetails.location}
                    onChange={changeValue} />
                <TextField 
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Department"
                    variant="standard"
                    name="department"
                    defaultValue={userDetails.department}
                    onChange={changeValue} />
                <TextField 
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Phone Number"
                    variant="standard"
                    name="phone_number"
                    defaultValue={userDetails.phone_number}
                    onChange={changeValue} />
                <Button 
                    onClick={() => props.editProfile(userDetails)} 
                    variant="outlined" 
                    style={{ color: '#388E3C', borderColor: '#388E3C', margin: '8px 0' }} >
                    Update User Details
                </Button>
            </Box>
        </Modal>
    </>;
}

export default ProfileDialog;
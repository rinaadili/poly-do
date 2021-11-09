import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

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

const NewStatusDialog = (props) => {
    const [newStatus, setNewStatus] = useState({
        name: '',
        description: ''
    });
    return <>
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <TextField style={{ width: '100%' }} id="standard-basic" label="Status" variant="standard" name="name" value={newStatus.name} onChange={(e) => setNewStatus({...newStatus, [e.target.name]: e.target.value})} />
                <TextField style={{ width: '100%' }} id="standard-basic" label="Description" variant="standard" name="description" value={newStatus.description} onChange={(e) => setNewStatus({...newStatus, [e.target.name]: e.target.value})} />
                <Button onClick={() => props.addNewStatus(newStatus)} variant="outlined" style={{color: '#388E3C', borderColor: '#388E3C', margin: '8px 0' }}>
                    Add New Status
                </Button>
            </Box>
        </Modal>
    </>;
}

export default NewStatusDialog;
import React, { useEffect } from 'react';

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

const ProjectDialog = (props) => {

    useEffect(() => {
        
    }, [])

    return <>
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <TextField style={{ width: '100%' }} id="standard-basic" label="Project name" variant="standard" value={props.newProjectField} onChange={(e) => props.setNewProjectField(e.target.value)} />
                {!props.editableProject ? <Button onClick={() => props.addNewProject()} variant="outlined" style={{color: '#388E3C', borderColor: '#388E3C', margin: '8px 0' }}>
                    Add Project
                </Button> :
                <Button onClick={() => props.editProject()} variant="outlined" style={{color: '#388E3C', borderColor: '#388E3C', margin: '8px 0' }}>
                    Update Project
                </Button>}
            </Box>
        </Modal>
    </>;
}

export default ProjectDialog;
import React, { useState, useEffect } from 'react';
import './style.scss';

import { useHistory, useParams } from "react-router-dom";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import BoardItem from '../../../components/BoardItem/boardItem.component';

import toast from 'react-hot-toast';
import { createUpdateList, getProjectLists } from '../../../services/Lists/lists.service';
import NewStatusDialog from '../../../components/Dialogs/NewStatusDialog/newStatusDialog.component';

const Board = () => {

    let history = useHistory();
    const { id } = useParams();
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const [ taskStatuses, setTaskStatuses ] = useState([]);
    
    useEffect(async () => {
        await getStatusLists();
    }, [])

    const getStatusLists = async () => {
        try {
            const response = await getProjectLists({project_id: id});
            setTaskStatuses(response.data.projectLists);
        } catch(e) {
            toast.error('Something wrong has happen, Please try again!');
        }
    }

    const addNewStatus = async (data) => {
        try {
            await createUpdateList({...data, project_id: id});
            getStatusLists();
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    return <>
        <div className="container"> 
            <div className="board-header d-flex justify-content-between align-items-center p-1">
                <h3>Workflow</h3>
                <div>
                    <Button 
                        variant="outlined" 
                        style={{color: 'white', borderColor: 'white', margin: 3 }} 
                        onClick={() => history.push(`/dashboard/project/${id}`)}
                    >
                        <EditIcon />
                    </Button>
                </div>
            </div>
            <div className="board d-flex">
                {taskStatuses && Object.keys(taskStatuses).map(status => <>
                    {console.log(taskStatuses[status])}
                    <BoardItem group={taskStatuses[status]} />
                </>)}
                <Button onClick={handleOpen} variant="outlined" style={{ color: '#388E3C', borderColor: '#388E3C', marginTop: 20, height: 40, width: 40 }}>
                    <AddIcon />
                </Button>
            </div>
        </div>
        <NewStatusDialog 
            addNewStatus={addNewStatus}
            open={open}
            handleClose={handleClose}
        />
    </>;
}

export default Board;
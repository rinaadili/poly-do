import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowRightAltSharpIcon from '@mui/icons-material/ArrowRightAltSharp';
import Button from '@mui/material/Button';

import { Message } from '../../../components/Common/Message/message.component';
import { allProjects, createUpdateProject, deleteProject } from '../../../services/Projects/projects.services';

import toast from 'react-hot-toast';
import './style.scss';
import ProjectDialog from '../../../components/Dialogs/ProjectDialog/projectDialog.component';

const Main = () => {

    let history = useHistory();
    
    const [ projects, setProjects ] = useState([]);
    const [ newProjectField, setNewProjectField ] = useState();
    const [ editableProject, setEditableProject ] = useState();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setNewProjectField();
        setEditableProject();
    };

    useEffect(() => {
        getAllProjects();
    }, [])

    const getAllProjects = () => {
        allProjects().then(res => {
            setProjects(res.data.projects);            
        }).catch(e => {
            toast.error('Something wrong has happen, Please try again!');
        })
    }

    const getProjectDetails = async (id) => {
        history.push({
            pathname: `/dashboard/project/${id}`,
            state: { project_id: id }
        });
    }

    const addNewProject = async () => {
        let data = {
            name: newProjectField,
        }
        if(newProjectField) {
            try {
                const response = await createUpdateProject(data);
                setProjects([...projects, response.data.project]);
                toast.success(response.data.message);
                handleClose();
                setNewProjectField('');
            } catch(e) {
                toast.error('Something wrong has happen, Please try again!');
            }
        } else {
            toast.error('Please Name of the project is required!');
        }
    }

    const removeProject = async (id) => {
        let data = {
            Project_id: id,
        }
        try {
            const response = await deleteProject(id);
            if(response.status === 200) {
                await getAllProjects();
                toast.success(response.data.message);
            }
        } catch(e) {
            toast.error('Something wrong has happen, Please try again!');
        }
    }
    
    const editProject = async () => {
        let data = {
            project_id: editableProject,
            name: newProjectField,
        }
        if(newProjectField) {
            try {
                const response = await createUpdateProject(data);
                setEditableProject();
                toast.success(response.data.message);
                await getAllProjects();
                handleClose();
                setNewProjectField('');
            } catch(e) {
                toast.error('Something wrong has happen, Please try again!');
            }
        } else {
            toast.error('Please Name of the project is required!');
        }
    }

    return <><div className="container d-flex flex-wrap">
        {!projects && <Message text="There are currently no projects to display!" />}
        {projects && projects.map(project => <div key={project?._id} 
            className="project-box d-flex flex-column m-2">
                <h6 className="project-name pb-2 text-center" title={project?.name}>{project?.name}</h6>
                <div className="d-flex justify-content-between">
                    <Button variant="outlined" style={{color: 'white', borderColor: 'white', margin: 3 }} onClick={() => {
                        handleOpen();
                        setNewProjectField(project.name)
                        setEditableProject(project?._id)
                    }}>
                        <EditIcon />
                    </Button>
                    <Button variant="outlined" style={{color: 'white', borderColor: 'white', margin: 3 }} onClick={() => removeProject(project?._id)}>
                        <DeleteIcon />
                    </Button>
                    <Button variant="outlined" style={{color: 'white', borderColor: 'white', margin: 3 }} onClick={() => getProjectDetails(project?._id)}>
                        <ArrowRightAltSharpIcon />
                    </Button>
                </div>
            </div>
        )}
        <Button onClick={handleOpen} variant="outlined" style={{color: '#388E3C', borderColor: '#388E3C', margin: 8 }}>
            <AddIcon />
        </Button>

    </div>
    <ProjectDialog
        open={open}
        handleClose={handleClose}
        newProjectField={newProjectField}
        editableProject={editableProject}
        addNewProject={addNewProject}
        editProject={editProject}
        setNewProjectField={setNewProjectField}
    />
    </>;
}

export default Main;
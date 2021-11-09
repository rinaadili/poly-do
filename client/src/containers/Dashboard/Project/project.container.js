import React, { useEffect, useState } from 'react';

import { Link, useParams } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { addProjectMembers, getProjectMembers, projectDetails } from '../../../services/Projects/projects.services';
import { getTaskStatuses } from '../../../services/Tasks/tasks.services';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import toast from 'react-hot-toast';

import './style.scss';
import { getAllUsers } from '../../../services/Auth/auth.services';
import { createUpdateList, getAllLists } from '../../../services/Lists/lists.service';

const Project = () => {

    const { id } = useParams();
    const [projectData, setProjectData] = useState();
    const [projectStatuses, setProjectStatuses] = useState();
    const [newStatus, setNewStatus] = useState({
        name: '',
        description: ''
    });
    const [users, setUsers] = useState([]);
    const [listOfUsers, setListOfUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        getProjectStatuses();
        setAllUsers();
        getProjectDetails();
        projectMembers();
    }, [])

    const projectMembers = () => {
        getProjectMembers({project_id: id}).then(response => {
            console.log(response.data)
            setSelectedUsers(response.data.users)
        }).catch(e => {
            console.log(e)
        })
    }

    const setAllUsers = () => {
        getAllUsers().then(response => {
            console.log(response.data)
            setListOfUsers(response.data.users)
        }).catch(e => {
            console.log(e)
        })
    }

    const getProjectDetails = () => {
        projectDetails({ project_id: id }).then(response => {
            console.log(response.data.result)
            setProjectData(response.data.result);
        }).catch(e => {
            console.log(e)
        })
    }

    const getProjectStatuses = async () => {
        try {
            const response = await getAllLists({project_id: id});
            setProjectStatuses(response.data.lists);
        } catch(e) {
            toast.error('Something wrong has happen, Please try again!');
        }
    }

    // const updateSelectedUsers = (e) => {
    //     console.log(e.target)
    //     setSelectedUsers([...selectedUsers, { id: e.target.name, value: e.target.value}])
    // }

    const handleSetUsers = (e) => {
        setUsers([...users, e.target.value[0]]);
    }

    const addMembersInProject = async () => {
        try {
            const response = await addProjectMembers(id, users)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const addNewStatus = async () => {
        try {
            const response = await createUpdateList({...newStatus, project_id: id});
            setProjectStatuses([...projectStatuses, response.data.result]);
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="container">
        <div className="project-header d-flex justify-content-between align-items-center p-1">
            {projectData?.name && <h3>Project: {projectData.name}</h3>}
            <div>
                <Link to={`/dashboard/backlog/${id}`} className="p-1">Backlog</Link>
                <Link to={`/dashboard/board/${id}`} className="p-1">Board</Link>
            </div>
        </div>
        <div className="d-flex">
            <div className="workflow-list p-2 ">
                {projectStatuses && projectStatuses.map(status => <div className="workflow__statuses d-flex flex-column m-2 p-2">
                    <p>{status.name}</p>
                    <p>{status.description}</p>
                </div>)}
                <div className="d-flex flex-column">
                    <TextField
                        style={{ width: '100%' }}
                        id="standard-basic"
                        label="Status"
                        variant="filled"
                        name="name"
                        defaultValue={newStatus.name}
                        onChange={(e) => setNewStatus({...newStatus, [e.target.name]: e.target.value})} />
                    <TextField
                        style={{ width: '100%' }}
                        id="standard-basic"
                        label="Description"
                        variant="filled"
                        name="description"
                        defaultValue={newStatus.description}
                        onChange={(e) => setNewStatus({...newStatus, [e.target.name]: e.target.value})} />
                    <button onClick={addNewStatus}>ADD</button>
                </div>
            </div>

            <div className="workflow-list p-2 ml-1 mr-1 d-flex flex-column">
                <h3>Add User</h3>
                {selectedUsers ? selectedUsers.map(userDetail => {
                    <div className="d-flex">{userDetail.firsName} {userDetail.firsName}</div>
                }) : <p>There are no member in this project!</p>}
                <FormControl sx={{ m: 1, width: 300 }}>
                    {/* <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        variant="filled"
                        value={selectedUsers}
                        onChange={updateSelectedUsers}
                    >
                    {listOfUsers && listOfUsers.map(userD => (
                        <MenuItem
                            key={userD?.id}
                            name={userD?.name}
                            value={userD?.id}
                        >{userD.name}</MenuItem>
                    ))}
                    </Select> */}

                    <InputLabel id="demo-multiple-chip-label">Select Users</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        variant="filled"
                        value={users}
                        onChange={handleSetUsers}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {listOfUsers.map(user => (
                            <MenuItem
                                key={user._id}
                                value={`${user.firstName} ${user.lastName}`}
                            >
                                {user.firstName} {user.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                    <button onClick={addMembersInProject}>
                        ADD
                    </button>

                </FormControl>
            </div>
        </div>

    </div>;
}

export default Project;
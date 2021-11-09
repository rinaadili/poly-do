import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'

import Cover from '../../../assets/images/cover.jpg';

import BoxWrapper from "../../../components/BoxWrapper/boxWrapper.component";

import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.scss';
import { getUserProjects } from "../../../services/Projects/projects.services";
import { getUserTasks } from "../../../services/Tasks/tasks.services";
import { Link } from "react-router-dom";

import AvatarIcon from '../../../assets/images/avatar.png';
import ProfileDialog from "../../../components/Dialogs/ProfileDialog/profileDialog.component";
import { getUserDetails, updateUserDetails } from "../../../services/Auth/auth.services";
import toast from "react-hot-toast";
import NotFound from "../../NotFound/notFound.container";
import { setUser } from "../../../store/slice/user.slice";

const Profile = () => {

    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.user);
    const [ userProfile, setUserProfile ] = useState();
    const [ projects, setProjects ] = useState([]);
    const [ tasks, setTasks ] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        getPersonalProjects();
        getPersonalTasks();
        setUserDetails(false);
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const setUserDetails = (update) => {
        getUserDetails().then(res => {
            setUserProfile(res.data.user);
            if(update) {
                dispatch(setUser({ token, user: res.data.user }));
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }
        }).catch(e => {
            toast.error('Something went wrong!')
        });
    }

    const getPersonalProjects = () => {
        getUserProjects(user).then(res => {
            setProjects(res.data.userProjects);
        }).catch(err => {
            console.log(err)
        });
    }

    const getPersonalTasks = () => {
        getUserTasks({user_id: user.id}).then(res => {
            setTasks(res.data.userTasks);
        }).catch(err => {
            console.log(err)
        });
    }

    const editProfile = async (data) => {
        try {
            await updateUserDetails(data);
            setUserDetails(true);
            toast.success('Succesfully updated!');
            handleClose();
        } catch(e) {
            toast.error('Something wrong has happen, Please try again!');
        }
    }

    return user ? <>
        <div className="profile">
            <div className="cover d-flex align-items-center">
                <img src={Cover} alt="Profile Cover" className="cover-image" />
            </div>
            <div className="container">
                <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex">
                        <div className="profile-photo__wrapper">
                            <div className="profile-photo__image d-flex justify-content-center align-items-center">
                                <img src={AvatarIcon} alt="Profile photo" />
                            </div>
                        </div>
                        <div className="d-flex flex-column px-4 justify-content-center">
                            <h2 className="main-color font-weight-bold">{userProfile?.firstName} {userProfile?.lastName}</h2>
                            <p>Software Developer</p>
                        </div>
                    </div>
                    <div style={{ cursor: 'pointer '}} className="d-flex justify-content-end align-items-center" onClick={handleOpen}>
                        <i className='fas fa-cog settings__edit-content' />
                    </div>
                </div>
                <div className="d-flex ">
                    <div className="about__container">
                        <BoxWrapper>
                            <h5 className="pb-2">ABOUT</h5>
                            <p className="pb-2">{userProfile?.position}</p>
                            <p className="pb-2">{userProfile?.department}</p>
                            <p className="pb-2">{userProfile?.company?.name}</p>
                            <p className="pb-2">{userProfile?.location}</p>
                        </BoxWrapper>
                        <BoxWrapper>
                            <h5 className="pb-2">CONTACT</h5>
                            <p className="pb-2">{user?.email}</p>
                            <p className="pb-2">{userProfile?.phoneNumber}</p>
                        </BoxWrapper>
                    </div>
                    <div className="w-100">
                        <BoxWrapper>
                            <h5 className="pb-2">PROJECTS</h5>
                            <div className="d-flex">
                                {projects.length > 0 ? projects.map(project => <>
                                    <div className="project-item d-flex p-2 ">
                                        <Link to={`/dashboard/backlog/${project?.project_id?._id}`} >{project?.project_id?.name}</Link>
                                    </div>
                                </>) : <>There are no project for you!</>}
                            </div>
                        </BoxWrapper>
                        <BoxWrapper>
                            <h5 className="pb-2">ON GOING TASKS</h5>
                            <div className="d-flex">
                                {tasks.length > 0 ? tasks.map(task => <>
                                    <div className="project-item d-flex flex-column p-2 ">
                                        <h5 className="text-center">{task?.title}</h5>
                                        <p className="text-center">{task?.description}</p>
                                    </div>
                                </>) : <span>There are no tasks for you!</span>}
                            </div>
                        </BoxWrapper>
                    </div>
                </div>
            </div>
        </div>
        {userProfile && <ProfileDialog
            open={open}
            editProfile={editProfile}
            handleClose={handleClose}
            user={userProfile}
        />}
    </> : <div className="container">
        <NotFound somethingHappen />
    </div>;
}

export default Profile;
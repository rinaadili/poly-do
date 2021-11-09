import React from 'react';
import './style.scss';
import Background from '../../assets/images/background.jpg'
import { Header } from '../../components/Header/header.component';
import { createUpdateTask } from '../../services/Tasks/tasks.services';

const LandingPage = () => {
    return <div className="landing__page--container">
        <img src={Background} />
    </div>;
}

export default LandingPage;
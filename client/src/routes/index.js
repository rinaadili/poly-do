import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Route
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Pages
import LandingPage from '../containers/Landingpage/landingPage.container';
import Login from '../containers/Login/login.container';
import Register from '../containers/Register/register.container';
import Backlog from '../containers/Dashboard/Backlog/backlog.container';
import Board from '../containers/Dashboard/Board/board.container';
import Profile from '../containers/Dashboard/Profile/profile.container';
import NotFound from '../containers/NotFound/notFound.container';
import Main from '../containers/Dashboard/Main/main.container';
import Project from '../containers/Dashboard/Project/project.container';

const Routes = () => {
    return <>
        <Switch>
            <PublicRoute exact path="/" exact component={LandingPage} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Main} />
            <PrivateRoute exact path="/dashboard/project/:id" component={Project} />
            <PrivateRoute path="/dashboard/backlog/:id" component={Backlog} />
            <PrivateRoute path="/dashboard/board/:id" component={Board} />

            <Route path="*" component={NotFound}/>
        </Switch>
    </>;
}

export default Routes;
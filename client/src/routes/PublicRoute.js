import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAuthenticated() ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
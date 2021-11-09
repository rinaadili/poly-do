import React, { useState, useEffect } from 'react';
import "./style.scss"

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/logo.component';
import { isAuthenticated } from '../../utils';

import { AccountMenu } from '../AccountMenu/accountMenu.component';

export const Header = () => {

    const { user } = useSelector(state => state.user);
    const [ userDetails, setUserDetails ] = useState();

    useEffect(() => {
        setUserDetails(user)
    }, [user])

    return <div className="header container d-flex justify-content-between align-items-center pt-2 pb-2">
        <div>
            <Logo />
        </div>
        <div className="d-flex align-items-center">
            {isAuthenticated() ? <>
                <AccountMenu user={userDetails} />
            </> : <>
                <Link to={'/login'} className="p-2">Login</Link>
                <Link to={'/register'} className="p-2">Register</Link>
            </>}
        </div>
    </div>
}
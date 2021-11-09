import React, { useState, useEffect } from 'react';
import './style.scss';

import call from '../../services/api';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/slice/user.slice';

import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Common/Input/input.component';
import Button from '../../components/Common/Button/button.component';
import { FacebookIcon, GoogleIcon } from '../../components/Common/Icons/icons.component';

import { login } from '../../services/Auth/auth.services';

import { validateLogin } from '../../utils';
import { TOKEN_KEY } from '../../utils/constants';

const Login = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    const [ data, setData ] = useState({
        email: '',
        password: '',
    });

    const _onInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const _submitToSignIn = async () => {
        if (validateLogin(data.email, data.password)) {
            try {
                const response = await login(data);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem(TOKEN_KEY, response.data.token);
                call.defaults.headers['authorization'] = response.data.token;
                dispatch(setUser({ 
                    user: response.data.user,
                    token: response.data.token,
                }));
                history.push('/dashboard')
            } catch(e) {
                toast.error('Something wrong has happen, Please try again!');
            }
        }
    }

    return <>
        <div className="login d-flex justify-content-center align-items-center">
            <div className="login__inner-container d-flex flex-column">
                <div className="login__title-container d-flex flex-column justify-content-center">
                    <p>Log in to continue to:</p>
                    <span>Your team's site</span>
                </div>
                <hr />
                <div className="d-flex flex-column">
                    <div className="pb-2">
                        <Input value={data.email} name="email" placeholder="Email" onChange={_onInputChange} />
                    </div>
                    <div className="pb-2">
                        <Input type="password" value={data.password} name="password" placeholder="Password" onChange={_onInputChange} />
                    </div>
                    <Button
                        style={{ backgroundColor: '#388E3C', color: '#FFFFFF', padding: '5px 0' }}
                        label="Sign in"
                        onClick={_submitToSignIn}
                    />
                </div>

                <hr />
                <div className="d-flex flex-column">
                    <p className="pb-2 text-center">Continue with</p>
                    <div className="pb-2">
                        <Button
                            style={{ backgroundColor: '#FFFFFF', color: '#388E3C', padding: '5px 0', border: '2px solid #388E3C' }}
                            icon={<GoogleIcon />}
                            label="Google"
                            onClick={() => console.log('test')}
                        />
                    </div>
                    <div className="pb-2">
                        <Button
                            style={{ backgroundColor: '#FFFFFF', color: '#388E3C', padding: '5px 0', border: '2px solid #388E3C' }}
                            icon={<FacebookIcon />}
                            label="Facebook"
                            onClick={() => console.log('test')}
                            // <a href={`${BASE_API_URL}/auth/google`} className='mb-2 google-btn'></a>
                        />
                    </div>
                </div>
                <hr />
                <Link to={'/register'} className="text-center">Sign up for an account</Link>
            </div> 
        </div>
    </>;
}

export default Login;
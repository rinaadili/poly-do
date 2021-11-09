import React, { useState } from 'react';

import './style.scss';
import { Link } from 'react-router-dom';

import Input from '../../components/Common/Input/input.component';
import Button from '../../components/Common/Button/button.component';
import { FacebookIcon, GoogleIcon } from '../../components/Common/Icons/icons.component';

import { register } from '../../services/Auth/auth.services';
import { validateRegister } from '../../utils';
import toast from 'react-hot-toast';

const Register = () => {
    const [ data, setData ] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const _onInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const _submitToRegister = async () => {
        let newData = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
        }
        if(validateRegister(newData)) {
            try {
                const response = await register(newData);
                if(response.status === 200) toast.success('You have successfully registered!')
            } catch(e) {
                toast.error('Something wrong has happen, Please try again!')
            }
        }
    }

    return <>
        <div className="register d-flex justify-content-center align-items-center">
            <div className="register__inner-container d-flex flex-column">
                <div className="register__title-container d-flex flex-column justify-content-center">
                    <p>Sign up to continue to:</p>
                    <span>Your team's site</span>
                </div>
                <hr />
                <div className="d-flex flex-column">
                    <div className="pb-2">
                        <Input value={data.email} name="email" placeholder="Email" onChange={_onInputChange} />
                    </div>
                    <div className="pb-2">
                        <Input value={data.firstName} name="firstName" placeholder="First name" onChange={_onInputChange} />
                    </div>
                    <div className="pb-2">
                        <Input value={data.lastName} name="lastName" placeholder="Last name" onChange={_onInputChange} />
                    </div>
                    <div className="pb-2">
                        <Input type="password" value={data.password} name="password" placeholder="Password" onChange={_onInputChange} />
                    </div>
                    <Button
                        style={{ backgroundColor: '#388E3C', color: '#FFFFFF', padding: '5px 0' }}
                        label="Sign up"
                        onClick={_submitToRegister}
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
                <Link to={'/login'} className="text-center">Already have an account? Log in</Link>
            </div> 
        </div>
    </>;
}

export default Register;
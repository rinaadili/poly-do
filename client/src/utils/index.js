import toast from "react-hot-toast";
import { verifyToken } from "../services/Auth/auth.services";
import { TOKEN_KEY } from "./constants";

export const getTokenFromStorage = (token) => localStorage.getItem(token);

export const isAuthenticated = () => {
    if (getTokenFromStorage(TOKEN_KEY) && authenticateToken()) {
        return true;
    } else {
        return false;
    }
}

export const authenticateToken = async () => {
    try {
        const response = await verifyToken();
        return response.status == 200 ? true : false;
    } catch(e) {
        console.log(e)
    }
}

export const validateLogin = (email, password) => {
    if(!isEmail(email)) {
        toast.error('Please check if your email is correct!');
        return false;
    }   
    if(!password) {
        toast.error('Please check your password!');
        return false;
    }
    return isEmail(email) && email && password;
}

export const validateRegister = (data) => {
    if(!isEmail(data.email)) {
        toast.error('Please check if your email is correct!');
        return false
    }
    if(!data.firstName) {
        toast.error('Please check if your First Name is correct!');
        return false;
    }
    if(!data.lastName) {
        toast.error('Please check if your last Name is correct!');
        return false;
    }
    if(!data.password && data.password.length < 8 ) {
        toast.error('Please check if your Password is correct!');
        return false;
    }
    return true;
}

export const isEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email), email)
    return re.test(email) ? true : false;
}
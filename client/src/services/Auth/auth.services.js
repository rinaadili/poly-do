import call, { keys } from '../api'

export const verifyToken = () => {
    return call.post(`${keys.auth}/verifyToken`);
}

export const login = (data) => {
    return call.post(`${keys.auth}/login`, data);
};

export const register = (data) => {
    return call.post(`${keys.auth}/register`, data);
};

export const forgotPassword = (data) => {
    return call.post(`${keys.auth}/forgot`, data);
};

export const updateUserDetails = (data) => {
    return call.post(`${keys.auth}/updateUserDetails`, data);
};

export const getUserDetails = (data) => {
    return call.get(`${keys.auth}/getUserDetails`, data);
};

export const getAllUsers = (data) => {
    return call.get(`${keys.auth}/getAllUsers`, data);
};
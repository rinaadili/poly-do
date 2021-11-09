/**
 * 
 * TODO: Te krijohen service per keta requesta
 * 
 * '/createProject' - Done
 * '/updateProject' - Done
 * '/deleteProject' - Done
 * '/addProjectMembers'
 * '/removeProjectMembers'
 * 
 */

import call, { keys } from '../api'

export const allProjects = () => {
    return call.post(`${keys.projects}/allProjects`);
};

export const projectDetails = (data) => {
    return call.post(`${keys.projects}/projectDetails`, data);
};

export const createUpdateProject = (data) => {
    return call.post(`${keys.projects}/createUpdateProject`, data);
}

export const deleteProject = (id) => {
    return call.delete(`${keys.projects}/deleteProject/${id}`);
}

export const getUserProjects = (user) => {
    return call.post(`${keys.projects}/getUserProjects`, user);
}

export const addProjectMembers = (project_id, members) => {
    return call.post(`${keys.projects}/addProjectMembers`, {project_id, members});
}

export const removeProjectMembers = (user) => {
    return call.post(`${keys.projects}/removeProjectMembers`, user);
}

export const getProjectMembers = (user) => {
    return call.get(`${keys.projects}/getProjectMembers`, user);
}

import call, { keys } from '../api'

export const userLists = (data) => {
    return call.post(`${keys.projects}/userLists`, data);
}

export const getTasksByStatus = (status) => {
    return call.post(`${keys.projects}/getTasksByStatus`, status);
}

export const getProjectLists = (data) => {
    return call.post(`${keys.lists}/getProjectLists`, data);
};

export const getAllLists = (data) => {
    return call.post(`${keys.lists}/getAllLists`, data);
};

export const createUpdateList = (data) => {
    return call.post(`${keys.lists}/createUpdateList`, data);
};
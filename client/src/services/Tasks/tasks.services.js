/**
 * 
 * TODO: Te krijohen service per keta requesta
 * 
 * '/assignTask'
 * '/unAssignTask'
 * '/getTasksByStatus'
 * '/getTaskStatuses' - Done
 * '/assignSubtask'
 * 
 */

import call, { keys } from '../api';

export const getTaskStatuses = (data) => {
    return call.post(`${keys.tasks}/getTaskStatuses`, data);
};

export const getUserTasks = (data) => {
    return call.post(`${keys.tasks}/getUserTasks`, data);
};

export const createUpdateTask = (data) => {
    return call.post(`${keys.tasks}/createOrUpdateTask`, data);
};

export const getTaskDetails = (data) => {
    return call.post(`${keys.tasks}/getTaskDetails`, data);
};

export const getProjectTasks = (data) => {
    return call.post(`${keys.tasks}/getProjectTasks`, data);
};

export const deleteTask = (data) => {
    return call.detele(`${keys.tasks}/deleteTask`, data);
};

export const createUpdateSubTask = (data) => {
    return call.post(`${keys.tasks}/createUpdateSubTask`, data);
};

export const getTaskSubTasks = (data) => {
    return call.post(`${keys.tasks}/getTaskSubTasks`, data);
};

export const getSubtaskDetails = (data) => {
    return call.post(`${keys.tasks}/getSubtaskDetails`, data);
};

export const deleteSubtask = (data) => {
    return call.delete(`${keys.tasks}/deleteSubtask`, data);
};
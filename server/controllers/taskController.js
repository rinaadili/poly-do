const Task = require('../models/task.model');
const SubTask = require('../models/subtask.model');
const AssignTask = require('../models/assign_task');
const AssignSubTask = require('../models/assign_subtask');
const List = require('../models/list');
const Project = require('../models/project');
const User = require('../models/user.model');

const createOrUpdateTask = async (req, res) => {
    if(req.body.task_id) {
        updateTask(req, res);
    } else {
        createTask(req, res);
    }
}

const assignTask = async (req, res) => {
    try {
        await assignTaskTo(req.body.task_id, req.body.assigned_to);
        res.status(200).json({message: "Task assigned successfully!"});
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const assignSubTask = async (req, res) => {
    try {
        await assignSubTaskTo(req.body.subtask_id, req.body.assigned_to);
        res.status(200).json({message: "Task assigned successfully!"});
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const unAssignTask = async (req, res) => {
    try {
        await unAssignTaskFrom(req.body.task_id, req.body.unAssignTask);
        res.status(200).json({message: "User unassigned from task!"});
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    } 
}

const getTaskDetails = async (req, res) => {
    try {
        let task = await Task.findById(req.body.task_id);
        res.status(200).json({ task: task });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const getTasksByStatus = async (req, res) => {
    try {
        let tasks = await Task.find({ list_id: req.body.list_id });
        res.status(200).json({ tasks: tasks }); 
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const getProjectTasks = async (req, res) => {
    try {
        let projectStatuses = await List.find();
        let projectTasksArray = {};

        for(let projectStatus of projectStatuses) {
            let projectTasks = await Task.find({ project_id: req.body.project_id, list_id: projectStatus._id});
            let tasks = [];
            for(projectTask of projectTasks) {
                task = await taskCollection(projectTask);
                tasks.push(task);
            }

            projectTasksArray[projectStatus.status] = tasks;
        }

        res.status(200).json({ projectTasks: projectTasksArray });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}


const getUserTasks = async (req, res) => {
    let userTasks = [];
    let assignedTasks = await AssignTask.find({ user_id: req.user.id });

    for(let assignedTask of assignedTasks) {
        let task = await Task.findById(assignedTask.task_id);

        if(task != null) {
            userTasks.push(task);
        }
    } 

    res.status(200).json({ userTasks: userTasks });
}

const getUserCompltedProjectTasks = async (req, res) => {
    try {
        let assignedTasks = await AssignTask.find({ user_id: req.user.id });
        let projectTasksArray = {};

        for(let assignedTask of assignedTasks) {
            let projectTasks = await Task.find({
                _id: assignedTask.task_id,
                project_id: req.body.project_id,
                list_id: '6183d1613c2fd0769d3d0c58'
            });
            projectTasksArray['complete'] = projectTasks;
        }
        
        res.status(200).json({ projectTasks: projectTasksArray });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const deleteTask = async (req, res) => {
    await Task.deleteOne({ _id: req.body.task_id }, (err, obj) => {
        if(err) {
            res.status(500).json({
                message: "Something went wrong!",
                error: err.message
            });
        } else if(obj.deletedCount != 0) {
            res.status(200).json({ message: obj });
        } else {
            res.status(200).json({ message: "Task was not found!" });
        }
    });
}

const getLists = async (req, res) => {
    List.find()
            .then(result => {
                res.status(200).json({ lists: result });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: err.message
                });
            });
}

const createUpdateSubtask = async (req, res) => {
    if(req.body.subtask_id) {
        updateSubTask(req, res);
    } else {
        createSubTask(req, res);
    }
}

const getTaskSubTasks = async (req, res) => {
    try {
        let subTasks = await SubTask.find({ task_id: req.body.task_id });
        let taskSubTasks = [];
        for(subTask of subTasks) {
            taskSubTasks.push(await subTaskCollection(subTask));
        }
        res.status(200).json({ subTasks: taskSubTasks });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const getSubtaskDetails = async (req, res) => {
    try {
        let subTask = await SubTask.findById(req.body.subtask_id);
        res.status(200).json({ subTask: subTask });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const deleteSubtask = async (req, res) => {
    await SubTask.deleteOne({ _id: req.body.subtask_id }, (err, obj) => {
        if(err) {
            res.status(500).json({
                message: "Something went wrong!",
                error: err.message
            });
        } else if(obj.deletedCount != 0) {
            res.status(200).json({ message: "Subtask deleted successfully!" });
        } else {
            res.status(200).json({ message: "SubTask was not found!" });
        }
    });
}

async function createTask(req, res) {
    let data = req.body;
    let assignedTo = data.assigned_to;

    if(!data.list_id) {
        data.list_id = "6183d14e3c2fd0769d3d0c57";
    }

    try {
        let task = new Task(data);
        await task.save();

        if(assignedTo) {
            await assignTaskTo(task._id, assignedTo);
        }

        res.status(200).json({message: 'Task created successfully!', task: task})
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

async function updateTask(req, res) {
    try {
        let assignedTo = req.body.assigned_to;
        let task = await Task.findOneAndUpdate({_id: req.body.task_id}, req.body, {new: true});

        if(task) {
            if(assignedTo) {
                await assignTaskTo(task._id, assignedTo);
            }

            if(task.list_id == '6183d1613c2fd0769d3d0c58') {
                task.finished_date = Date.now();
                await task.save();
            }

            res.status(200).json({ message: 'Task updated successfully!', task: task });
        }
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

async function assignTaskTo(taskId, assignedTo) {
    for(let assignTo of assignedTo) {
        let assignTaskExists = await AssignTask.findOne({user_id: assignTo, task_id: taskId});
        if(!assignTaskExists) {
            let assignTask = await new AssignTask({
                "task_id": taskId,
                "user_id": assignTo
            });

            await assignTask.save();
        } 
    }
}

async function unAssignTaskFrom(taskId, unAssignUser) {
    for(let unAsignTo of unAssignUser) {
        await AssignTask.findOneAndDelete({user_id: unAsignTo, task_id: taskId});
    }
}

async function createSubTask(req, res) {
    try{
        let data = req.body;
        if(!data.sublist_id) {
            data.sublist_id = "6183d14e3c2fd0769d3d0c57";
        }
    
        let subTask = await new SubTask(data);
        let assignedTo = req.body.assigned_to;

        await subTask.save();

        if(assignedTo) {
            await assignSubTaskTo(subTask._id, assignedTo);
        }
        
        res.status(200).json({message: 'SubTask created successfully!', result: subTask})
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

async function updateSubTask(req, res) {
    try {
        let subTask = await SubTask.findOneAndUpdate({_id: req.body.subtask_id}, req.body, {new: true});
        let assignedTo = req.body.assigned_to;

        if(subTask) {
            if(assignedTo) {
                await assignSubTaskTo(subTask._id, assignedTo);
            }
            
            res.status(200).json({ message: 'SubTask updated successfully!', result: subTask });
        }
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

async function assignSubTaskTo(subTaskId, assignedTo) {
    for(let assignTo of assignedTo) {
        let assignSubTaskExists = await AssignSubTask.findOne({user_id: assignTo, task_id: subTaskId});
        if(!assignSubTaskExists) {
            let assignSubTask = await new AssignSubTask({
                "subtask_id": subTaskId,
                "user_id": assignTo
            });

            await assignSubTask.save();
        }
    }
}

async function taskCollection(task) {
    return {
        "id": task._id,
        "title": task.title,
        "description": task.description,
        "project": await Project.findById(task.project_id),
        "createdBy": await User.findById(task.created_by),
        "List": await List.findById(task.list_id),
        'dueDate': task.due_date,
        'finishedDate': task.finished_date,
        'assignedTo': await taskAssignTo(task._id)
    }
}

async function subTaskCollection(subtask) {
    return {
        "id": subtask._id,
        "title": subtask.title,
        "description": subtask.description,
        "subList": await List.findById(subtask.sublist_id),
        'dueDate': subtask.due_date,
        'finishedDate': subtask.finished_date,
        'assignedTo': await subTaskAssignTo(subtask._id)
    }
}

async function taskAssignTo(taskId) {
    let assignedTasks = await AssignTask.find({ task_id: taskId });
    let assignedTo = [];

    for(assignedTask of assignedTasks) {
        assignedTo.push(await User.findById(assignedTask.user_id));
    }   
    
    return assignedTo;
}

async function subTaskAssignTo(subTaskId) {
    let assignedTasks = await AssignSubTask.find({ subtask_id: subTaskId });
    let assignedTo = [];

    for(assignedTask of assignedTasks) {
        let user = await User.findById(assignedTask.user_id);
        if(user) {
            assignedTo.push(user);
        }
    }   
    
    return assignedTo;
}

module.exports = {
    createOrUpdateTask,
    getTasksByStatus,
    getTaskDetails,
    deleteTask,
    getProjectTasks,
    createUpdateSubtask,
    getTaskSubTasks,
    deleteSubtask,
    getSubtaskDetails,
    assignTask,
    unAssignTask,
    getLists,
    assignSubTask,
    getUserTasks,
    getUserCompltedProjectTasks
}
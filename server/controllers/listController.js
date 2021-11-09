const List = require('../models/list');
const Task = require('../models/task.model');
const AssignTask = require('../models/assign_task');
const Project = require('../models/project');
const User = require('../models/user.model');

const createUpdateList = async (req, res) => {
    if(req.body.list_id) {
        let list = await List.findOneAndUpdate({ _id: req.body.list_id }, req.body, { new: true });

        if(list) {
            res.status(200).json({ message: 'List updated successfully!', result: list });
        }
    } else {
        try {
            let list = new List(req.body);
            list.slug =  req.body.name.split(' ').join('-').toLowerCase();
            await list.save();
    
            res.status(200).json({ message: 'List created successfully!', result: list })
        } catch(err) {
            res.status(500).json({
                message: "Something went wrong!",
                error: err.message
            });
        }
    }
}

const getAllLists = async (req, res) => {
    try {
        let lists = await List.find({ project_id: req.body.project_id });
        res.status(200).json({ lists: lists });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const getProjectLists = async (req, res) => {
    try {
        let assignedTasks = await AssignTask.find({ user_id: req.user.id }).select('task_id');
        let projectLists = await List.find({ project_id: req.body.project_id }).select('name slug project_id');
        let taskIds = [];
        let projectTasksArray = {};

        for(assignedTask of assignedTasks) {
            taskIds.push(assignedTask.task_id.toString());
        }

        for(projectList of projectLists) {
            let listTasks = await Task.find({ list_id: projectList._id });
            let tasks = [];

            for(listTask of listTasks) {
                if(taskIds.includes(listTask._id.toString())){
                    tasks.push(await taskCollection(listTask));
                }
            }

            projectTasksArray[projectList.slug] = {name: projectList.name, tasks};
        }

        res.status(200).json({ projectLists: projectTasksArray });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const userLists = async (req, res) => {
    try {
        let lists = await List.find({ user_id: req.body.user_id });
        res.status(200).json({lists: lists});
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const getListTasks = async (req, res) => {
    try {
        let listTasks = await Task.find({ list_id: req.body.list_id });
        res.status(200).json({ listTasks: listTasks });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const assignTask = async (req, res) => {
    let listId = req.body.list_id;
    let tasks = req.body.tasks;

    try{
        for(let taskId of tasks) {
            let task = await Task.findById(taskId);

            if(task) {
                task.list_id = listId;
                await task.save();
            }
        }

        res.status(200).json({ message: "Task assigned to list!" });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const unAssignTask = async (req, res) => {
    try {
        let task = await Task.findByIdAndUpdate(req.body.task_id, { list_id: null });
        if(task) {
            res.status(200).json({ message: "Task unassigned to list!" });
        } else {
            res.status(200).json({ message: "Task was not found!" });
        }
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
} 

const deleteList = async (req, res) => {
    try {
        let deletedList = await List.findByIdAndDelete(req.body.list_id);
        if(deletedList) {
            let listTasks = await Task.find({ list_id: req.body.list_id });

            if(listTasks) {
                for(let listTask of listTasks) {
                   let task = await Task.findById(listTask._id);
                   task.list_id = null;
                   await task.save();
                }
            }
            res.status(200).json({ message: 'List deleted successfully!' });
        } else {
            res.status(200).json({ message: 'List not found!' });
        }
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
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

module.exports = {
    createUpdateList,
    userLists,
    getListTasks,
    deleteList,
    assignTask,
    unAssignTask,
    getProjectLists,
    getAllLists
}



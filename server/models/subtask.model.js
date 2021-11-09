const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subTaskSchema = Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Task', 
        default: "617fdd1f6c9017a53aece026"
    },
    title: {
        type: String,
        required: [true, 'Please enter the project name']
    }, 
    description: {
        type: String,
        required: [true, 'Please enter the task description']
    },
    list_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'List', 
        required: true ,
    },  
    due_date: {
        type: Date
    }, 
    finished_date: {
        type: Date,
        default: null
    },
}, { timestamps: true });

const SubTask = mongoose.model('SubTask', subTaskSchema);

module.exports = SubTask;
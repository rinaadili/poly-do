const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    title: {
        type: String,
        required: [true, 'Please enter the task title']
    }, 
    description: {
        type: String,
        required: [true, 'Please enter the task description']
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Project', 
        default: "617fdd1f6c9017a53aece026"
    },
    list_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'List',
        required: true,
    },  
    due_date: {
        type: Date,
    }, 
    finished_date: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
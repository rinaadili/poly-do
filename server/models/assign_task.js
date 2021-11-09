const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignTaskSchema = Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Task', 
        required: [true, 'Please provide the task id']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: [true, 'Please provide the user id']
    }
}, { timestamps: true });

const AssignTask = mongoose.model('AssignTask', assignTaskSchema);

module.exports = AssignTask;
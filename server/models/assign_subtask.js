const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignSubTaskSchema = Schema({
    subtask_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'SubTask', 
        default: "617fdd1f6c9017a53aece026"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true
    }
}, { timestamps: true });

const AssignSubTask = mongoose.model('AssignSubTask', assignSubTaskSchema);

module.exports = AssignSubTask;
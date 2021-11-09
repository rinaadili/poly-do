const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = Schema({
    name: {
        type: String,
        required: [true, 'Please enter the project name']
    },
    slug: {
        type: String,
        required: [true, 'Please enter the project slug']
    }, 
    description: {
        type: String,
        required: [true, 'Please enter the task description']
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Project', 
        required: [true, 'Please enter the project id']
    }
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;
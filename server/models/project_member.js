const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectMemberSchema = Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Project', 
        required: [true, 'Please provide the project id']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: [true, 'Please provide the user id']
    },
}, { timestamps: true });

const ProjectMember = mongoose.model('ProjectMember', projectMemberSchema);

module.exports = ProjectMember;
const Resource = require('resources.js');
const TaskStatus = require('../models/task_status');
const Project = require('../models/project');
const User = require('../models/user.model');
 
class TaskResource extends Resource {
    toArray() {
        return {
            id: Number(this._id),
            title: this.title,
            description: this.description,
            project: this.project_id
        }
    }
}
 
module.exports = TaskResource;
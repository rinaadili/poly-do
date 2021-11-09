const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = Schema({
    name: {
        type: String,
        required: [true, 'Please enter the project name']
    }, 
    company_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Company', 
        default: "617fdd1f6c9017a53aece026"
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
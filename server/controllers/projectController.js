const Project = require('../models/project');
const ProjectMember = require('../models/project_member');

const getAllProjects = async (req, res) => {
    try{
        let projects = await Project.find({_company_id: "617fdd1f6c9017a53aece026"});
        res.status(200).json({projects: projects});
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        }); 
    }
}

const getUserProjects = async (req, res) => {
    try {
        let userProjects = await ProjectMember.find({ user_id: req.user.id })
                                    .populate('project_id')
                                    .select('project_id');

        res.status(200).json({ userProjects: userProjects });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        }); 
    }
}

const showProjectDetails = async (req, res) => {
    try {
        let project = await Project.findById(req.body.project_id);

        if(project) {
            res.status(200).json({result: project});
        } else {
            res.status(200).json({message: "Project not found"});
        }
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const getProjectMembers = async (req, res) => {
    try {
        let projectUsers = await ProjectMember.find({ project_id: req.body.project_id })
                                    .populate('user_id')
                                    .select('user_id');

        res.status(200).json({ projectUsers: projectUsers });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        }); 
    }
}

const createUpdateProject = async (req, res) => {
    try {
        if(req.body.project_id) {
            let project = await updateProject(req.body);

            if(project) {
                res.status(200).json({ message: 'Project updated successfully!', project: project });
            }
        } else {
            let project = await createProject(req.body);

            if(project) {
                res.status(200).json({ message: 'Project created successfully!', project: project });
            }
        }
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

async function createProject(data) {
    let project = new Project(data);
    await project.save();

    if(project) {
        if(data.members) {
            await addMembers(data, project._id);
        }
    }

    return project;
}

async function updateProject(data) {
    let project = await Project.findByIdAndUpdate({ _id: data.project_id }, data, { new: true });

    if(project) {
        if(data.members) {
            await addMembers(data, project._id);
        }
    }

    return project;
}

async function addMembers(data, projectId) {
    let projectMembers = data.members;

    for(let memberId of projectMembers) {
        let projectMemberExists = await ProjectMember.findOne({project_id: projectId, user_id: memberId});
        if(!projectMemberExists) {
            let projectMember = await new ProjectMember({
                "project_id": projectId,
                "user_id": memberId
            });

            await projectMember.save();
        }
    }
}

const deleteProject = async (req, res) => {
    Project.findByIdAndDelete(req.params.id, function (err, docs) {
        if (err){
            res.status(500).json({
                message: "Something went wrong!",
                error: err.message
            });
        }
        else if(docs) {
            res.status(200).json({ message: 'Project successfully deleted!' });
        } else {
            res.status(200).json({ message: 'Could not delete project!' });
        }
    });
}

const addProjectMembers = async (req, res) => {
    let projectMembers = req.body.members;
    let projectId = req.body.project_id

    for(let memberId of projectMembers) {
        try {
            let projectMemberExists = await ProjectMember.findOne({project_id: projectId, user_id: memberId});
            if(!projectMemberExists) {
                let projectMember = await new ProjectMember({
                    "project_id": projectId,
                    "user_id": memberId
                });
    
                await projectMember.save();
            }

        } catch(err) {
            res.status(500).json({
                message: "Something went wrong!",
                error: err.message
            });
        }
    }

    res.status(200).json({message: 'Project member added successfully!'})
}

const removeProjectMembers = async (req, res) => {
    let projectMembers = req.body.members;

    for(let memberId of projectMembers) {
        try {
            await ProjectMember.findOneAndDelete({project_id: req.body.project_id, user_id: memberId})
        } catch(err) {
            res.status(500).json({
                message: "Something went wrong!",
                error: err.message
            });
        }
    }

    res.status(200).json({message: 'Project member deleted successfully!'});
}

module.exports = {
    getAllProjects,
    getUserProjects,
    showProjectDetails,
    deleteProject,
    addProjectMembers,
    removeProjectMembers,
    createUpdateProject,
    getProjectMembers
}
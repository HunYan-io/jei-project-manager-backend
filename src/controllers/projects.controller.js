const Member = require("../models/member.model");
const Project = require("../models/project.model");

exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            include: {
                model: Member,
                attributes: ["name"],
            },
        });
        res.status(200).json(
            projects.map((project) => ({
                id: project.id,
                name: project.name,
                type: project.type,
                description: project.description,
                members: project.members.map(({ name }) => name),
                deadline: project.deadline,
            }))
        );
    } catch (err) {
        return next(err);
    }
};

exports.postProject = async (req, res, next) => {
    try {
        await Project.create(
            {
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                members: req.body.members.map((name) => ({ name })),
                deadline: req.body.deadline,
            },
            {
                include: Member,
            }
        );
        res.status(200).json({ success: true });
    } catch (err) {
        return next(err);
    }
};

exports.deleteProject = async (req, res, next) => {
    try {
        await Project.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ success: true });
    } catch (err) {
        return next(err);
    }
};

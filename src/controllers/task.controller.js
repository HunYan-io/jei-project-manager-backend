const req = require("express/lib/request");
const res = require("express/lib/response");
const Task = require("../models/task.model")

//create a task
exports.create=(req,res)=>{
    if(!req.body.name && !req.body.deadline){
        res.status(400).send({
            message:"Missing content"
        });
    return;
    }

    const task = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        deadline : req.body.deadline,
        status : req.body.status
    };
    
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Error creating task"
            });
        });
};



//get all tasks
exports.findAll = (req,res) =>{
    Task.findAll()
        .then(data => {res.send(data);})
        .catch(err => {
            res.status(500).send({
                message : err.message || "Error occured"
            })
        })
}

//get a task by id
exports.findOne = (req,res) => {
    const id = req.params.id;

    Task.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    message:`Cannot find task with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Error retrieving task"
            })
        })
}

//delete a task by id
exports.delete = (req , res) =>{

    const id = req.params.id;

    Task.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete task with id=" + id
            });
        });
}


//update task by id

exports.update = (req,res) => {
    const id = req.params.id;

    Task.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Task was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Task with id=" + id
        });
    });
}
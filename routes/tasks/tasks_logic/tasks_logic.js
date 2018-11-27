const db = require('../../../db/db.js');
const _ = require('lodash');

module.exports = {
    add_task: (task) => {
        if (module.exports.validate_create(task)) {
            let new_index = db.tasks.length
            task.id = new_index;
            db.tasks.push(task);
            return task;
        } else {
            throw 'Invalid task';
        }
    },
    get_tasks: (searchkey) => {
        if (searchkey != null && searchkey != undefined && (typeof searchkey) === 'string') {
            return db.tasks.find(function (element) { return element.title.includes(searchkey) || element.description.includes(searchkey); });
        }
        else
            throw 'invalid searchkey';
    },
    get_task_by_id: (id) => {
        if (isNaN(id) || id < 0)
            throw 'id not valid';
        else
            return db.tasks[id];
    },
    update_task: (task, id) => {
        if (module.exports.validate_update(task)) {
            db.tasks[id] = task; //da rivedere, non credo che funzioni
        }
        else
            throw 'invalid task';
    },
    delete_task: (id) => {
        if (isNaN(id) || id < 0)
            throw 'id not valid';
        else
            return;
        //da rivedere, se lo elimino nel modo classico succede un disastro con gli id
    },

    validate_create: (task) => {//da finire
        if (task == null || task == undefined || task.title == null || task.title == undefined || task.description == null || task.description == undefined || task.type == null || task.type == undefined)
            return false;
        else if (isFinite(task.id) && task.id >= 0 && task.title.length > 0 && task.description.length > 0 && task.type.length > 0)
            return true;
        else
            return false;
    },
    validate_update: (task) => {// da finire
        if (task == null || task == undefined)
            return false;
        else
            return true;
    }
}
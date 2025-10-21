const logger = require("../logger");
const Task = require("../models/task");

async function inserisci(data) {
    const { title, completed, priority } = data;
    const task = await Task.create({ title, completed, priority });
    return task;
}

async function getAll() {
    const task = await Task.find();
    return task;
}

async function elimina(id) {
    const task = await Task.findByIdAndDelete(id);
    if (task) {
        logger.warn(`Task eliminato: ${task.title} (id: ${task._id})`)
    }
    return task;
}

async function aggiorna(id, data) {
    const task = await Task.findByIdAndUpdate(id, data, {
        new: true, runValidators: true
    });
    return task;
}

async function completed() {
    // sort() va chiamato sulla query, non sull'array
    const tasks = await Task.find({ completed: true }).sort({ createdAt: -1 });
    return tasks;
}


module.exports = { inserisci, getAll, elimina, aggiorna, completed };


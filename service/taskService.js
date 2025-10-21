const Task = require("../models/task");

async function inserisci(data) {
    const {title,completed} = data;
    const task = await Task.create({title,completed});
    return task;
}

async function getAll() {
    const task = await Task.find();
    return task;
}

async function elimina(id) {
    const task = await Task.findByIdAndDelete(id);
    return task;
}

async function aggiorna(id,data) {
    const {title,completed} = data;
    const task = await Task.findByIdAndUpdate(id,data,{
        new:true, runValidators:true
    });
    return task;
}

module.exports = {inserisci, getAll, elimina, aggiorna};


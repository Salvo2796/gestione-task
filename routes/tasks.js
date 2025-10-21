const express = require("express");
const validate = require("../middleware/validate");
const Joi = require("joi");
const taskService = require("../service/taskService")

const router = express.Router();

const schema = Joi.object({
    title: Joi.string().required(),
    completed: Joi.boolean().default(false),
    priority: Joi.string().valid("bassa","media", "alta").default("media")
});

//INSERIMENTO
router.post("/", validate(schema), async (req, res, next) => {

    try {

        const task = await taskService.inserisci(req.body);
        return res.status(201).json({ task });

    } catch (err) {
        next(err);
    }

});

//OTTIENI TUTTI
router.get("/", async (req, res, next) => {

    try {
        const task = await taskService.getAll();
        return res.status(200).json({ task })

    } catch (err) {
        next(err);
    }
})

//ELIMINA
router.delete("/:id", async (req, res, next) => {
    try {
        const task = await taskService.elimina(req.params.id);
        if (!task) { return res.status(404).json({ error: "NOT_FOUND" }) }
        res.status(204).end();

    } catch (err) {
        next(err)
    }
});

//MODIFICA
router.patch("/:id", validate(schema), async (req,res,next) => {
    try {
        const task = await taskService.aggiorna(req.params.id, req.body);
        if(!task) {return res.status(404).json({error: "NOT_FOUND"})}

        res.json({task});
    } catch (err) {
        next(err)
    }
})

//RICERCA TASK COMPLETATI
router.get("/completed", async (req,res,next) => {
    try {
        const tasks = await taskService.completed();
        res.json(tasks); // anche se vuoto, restituisce un array []
    } catch (err) {
        next(err)
    }
})

module.exports = router;



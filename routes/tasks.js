const express = require("express");
const validate = require("../middleware/validate");
const Joi = require("joi");
const taskService = require("../service/taskService")

const router = express.Router();

const schema = Joi.object({
    title: Joi.string().required(),
    completed: Joi.boolean().default(false)
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
        const task = taskService.aggiorna(req.params.id, req.body);
        if(!task) {return res.status(404).json({error: "NOT_FOUND"})}

        res.json({task});
    } catch (err) {
        next(err)
    }
})

module.exports = router;



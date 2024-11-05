const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/musicians', async (req, res) => {
    const musicians = await Musician.findAll({});
    res.json(musicians);
})

app.get('/musicians/:id', async (req, res) => {
    id = req.params.id;
    const findMusician = await Musician.findByPk(id);

    if (!findMusician) {
        return res.status(404).json({ error: 'Musician not found' });
    }

    res.json(findMusician);
})

app.post('/musicians', async (req, res) => {
    const musician = await Musician.create(req.body);
    res.json(musician);
})

app.put('/musicians/:id', async (req, res) => {
    const updatedMusician = await Musician.update(req.body, {where: {id: req.params.id}});
    res.json(updatedMusician);
})

app.delete('/musicians/:id', async (req, res) => {
    const deletedMusician = await Musician.destroy({where: {id: req.params.id}});
    res.json(deletedMusician);
})


module.exports = app;
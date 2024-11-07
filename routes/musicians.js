const express = require("express");
const router = express.Router();
const { Musician } = require("../models/index");
const { check, validationResult } = require('express-validator');

let musicians = [];

router.get('/', async (req, res) => {
    const musicians = await Musician.findAll({});
    res.json(musicians);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const findMusician = await Musician.findByPk(id);
        if (!findMusician) {
            return res.status(404).json({ error: 'Musician not found' });
        }
        res.json(findMusician);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the musician' });
    }
});

router.post('/', [
    check('name').not().isEmpty().trim().withMessage('Name is required.'),
    check('instrument').not().isEmpty().trim().withMessage('Instrument is required.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({error: errors.array()});
    } else {
        const { name, instrument } = req.body;
        const newMusician = { name, instrument };
        musicians.push(newMusician);
        res.json(musicians);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Musician.update(req.body, { where: { id } });
        if (!updated) {
            return res.status(404).json({ error: 'Musician not found' });
        }
        const updatedMusician = await Musician.findByPk(id);
        res.json(updatedMusician);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while updating the musician' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Musician.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Musician not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the musician' });
    }
});

module.exports = router;

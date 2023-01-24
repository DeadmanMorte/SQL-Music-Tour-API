const bands = require('express').Router()
const db = require('../models')
const { Band,MeetGreet,Event, SetTime, Stage } = db
const { Op } = require('sequelize')

bands.get('/', async(req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [[ 'available_start_time', 'ASC']],
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

bands.get('/:name', async(req, res) => {
    try {
        const foundBand = await Band.findOne({
        where: { name: req.params.id },
        include: [{
            model:MeetGreet, 
            as: "meet_greets",
            include: {model: Event, 
                as: "events", 
                where: {name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}}}
            },
            {
                model: SetTime, 
                as: "set_times", 
                include: {model: Event, as: "events",
                where: {name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}}}
        }]
    })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

bands.post('/', async(req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

bands.put('/:id', async(req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band`,
            data: newBand
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

bands.delete('/:id', async(req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band`,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = bands
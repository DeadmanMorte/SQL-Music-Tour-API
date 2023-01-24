const events = require('express').Router()
const db = require('../models')
const { Event, MeetGreet, SetTime, Stage, Band } = db
const { Op } = require('sequelize')

events.get('/', async(req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [[ 'date', 'ASC']],
            where: {
                name: {[Op.like]: `%${req.query.name ? eq.query.name : ''}%`}
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

events.get('/:name', async(req, res) => {
    try {
        const foundEvent = await Event.findOne({
        where: { name: req.params.id },
        include: [{
            model:MeetGreet, 
            as: "meet_greets",
            include: {model: Band, as: "bands", 
            where: {name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}}}
            },
            {
                model: SetTime, 
                as: "set_times", 
                include: {model: Band, as: "bands",
                where: {name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}}}
            },
            { 
                model: Stage, 
                as: "stages", 
                include: {model: Band, as: "bands",
                where: {name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}}}
            },
    ]
    })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

events.post('/', async(req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

events.put('/:name', async(req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                name: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated the ${updatedEvents} event`,
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

events.delete('/:name', async(req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                name: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted the ${deletedEvents} event!`,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = events
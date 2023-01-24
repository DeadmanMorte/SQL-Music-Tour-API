const stages = require('express').Router()
const db = require('../models')
const { Event, MeetGreet, SetTime, Stage, Band } = db
const { Op } = require('sequelize')

stages.get('/', async(req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [[ 'date', 'ASC']],
            where: {
                name: {[Op.like]: `%${req.query.name ? eq.query.name : ''}%`}
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

stages.get('/:name', async(req, res) => {
    try {
        const foundStage = await Stage.findOne({
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
                model: Event, 
                as: "events", 
                include: {model: Band, as: "bands",
                where: {name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}}}
            },
    ]
    })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

stages.post('/', async(req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

stages.put('/:name', async(req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                name: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated the ${updatedStages} stage`,
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

stages.delete('/:name', async(req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                name: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted the ${deletedStages} stage!`,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = stages
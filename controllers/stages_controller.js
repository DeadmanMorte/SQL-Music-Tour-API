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

stages.get('/:id', async(req, res) => {
    try {
        const foundStage = await Stage.findOne({
        where: { stage_id: req.params.id }
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

stages.put('/:id', async(req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
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

stages.delete('/:id', async(req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
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
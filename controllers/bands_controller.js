const bands = require('express').Router()
const db = require('../models')
const { Band } = db

bands.get('/', async(req, req) => {
    try {
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

bands.get('/:id', async(req, req) => {
    try {
        const foundBand = await Band.findOne({
        where: { band_id: req.params.id }
    })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

bands.post('/', async(req, req) => {
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

bands.put('/:id', async(req, req) => {
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

bands.delete('/:id', async(req, req) => {
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
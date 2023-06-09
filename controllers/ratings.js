const Rating = require('../models').Rating;

async function index(req, res) {
  try {
    const ratings = await Rating.findAll()
    res.status(200).json(ratings)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addRating(req, res) {
  try {
    const rating = await Rating.create(req.body)
    console.log(rating, 'rating')
    res.status(201).json(rating)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    const rating = await Rating.create(req.body)
    res.status(201).json(rating)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const rating = await Rating.findByPk(req.params.id)
    res.status(304).json(rating)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    const rating = await Rating.findByPk(req.params.id)
    await rating.update(req.body)
    res.status(202).json(rating)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function destroy(req, res) {
  try {
    const rating = await Rating.findByPk(req.params.id)
    await rating.destroy()
    res.status(204).json(rating)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = {index, create, show, update, destroy, addRating}
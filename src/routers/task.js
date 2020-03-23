const express = require('express')
const router = new express.Router()
const Task = require('../models/Task')

// Routes for tasks
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)
    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch {
    res.status(500).send()
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  const updates = Object.keys(req.body)
  const allowedUpdates = ['completed', 'description']
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })
 
  if(!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'})
  } 

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})

    if (!task) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }

})

router.delete('/tasks/:id', async (req, res) => {
  _id = req.params.id

  try {
    const task = await Task.findByIdAndDelete(_id)

    if (!task) {
      res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
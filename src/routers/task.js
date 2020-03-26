const express = require('express')
const router = new express.Router()
const Task = require('../models/Task')
const auth = require('../middleware/auth')

// Routes for tasks
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/tasks', auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id})
    await req.user.populate('tasks').execPopulate()
    res.send(req.user.tasks)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({_id, owner: req.user._id})
    
    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch {
    res.status(500).send()
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
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
    const task =  await Task.findOne({_id, owner: req.user._id})

    if (!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => {
      task[update] = req.body[update]
    })
    await task.save()

    res.send(task)
  } catch (error) {
    res.status(400).send(error)
  }

})

router.delete('/tasks/:id', auth, async (req, res) => {
  _id = req.params.id

  try {
    const task = await Task.findOneAndDelete({_id, owner: req.user._id})

    if (!task) {
      res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
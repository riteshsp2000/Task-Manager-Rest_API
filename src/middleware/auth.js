const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    // console.log(token)
    const decoded = jwt.verify(token, 'thisismynewcourse')
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
    
    

    if(!user) {
      throw new Error()
    }

    req.token = token
    req.user = user

    next()
    
  } catch(error) {
    res.status(401).send({error: "please authenticate."})
    // console.log(error)
  }
}

module.exports = auth
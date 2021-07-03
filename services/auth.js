const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
async function authenticate({ email, password }) {
    const userDetails = await User.findOne({ email: email})
    if(!userDetails){
      throw new Error('User not found')
    }
    else{
      console.log(userDetails)
      let isMatch = await bcrypt.compare(password,userDetails.password)
      if(!isMatch){
        throw new Error('Invalid Password')
      }
      else{
        const token = jwt.sign({
          email:userDetails.email,
          id:userDetails.id.toString()
      },'secretkey',{expiresIn:'1h'})
          return {token,email:userDetails.email,id:userDetails.id.toString()}
      }
    }

}


module.exports = {authenticate}
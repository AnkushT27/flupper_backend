const Registrationservice = require('../services/auth')
const User = require('../model/user')
exports.login = async (req,res,next)=>{
    let email = req.body.email;
    let password = req.body.password;
    try{
        let info = await Registrationservice.authenticate({email,password});
        return res.status(200).json(info);
    }
    catch(e){
        next(e)
    }
}
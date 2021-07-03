const jwt = require('jsonwebtoken')
const tokenVerify = (req,res,next)=>{
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', (err, authData) => {
            if (err) {
                res.status(403).send({'msg':"Invalid Token"});
            } else {
                next();
            }
        })
    }
    else{
        res.status(403).send({'msg':"No Token Found"});
    }
}

module.exports = tokenVerify;


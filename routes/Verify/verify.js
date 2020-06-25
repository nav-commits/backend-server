const jwt = require('jsonwebtoken');

module.exports = (req,res, next) =>{
    try {
    const token = req.header('auth-token');
    const veri = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userdata = veri;
    next();
    }
    catch(err) {
        return res.sendStatus(400).json({
            message: `${err}, failed`
        });
    }
};
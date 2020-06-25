const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcryptjs');
const saltrounds = 10;
const jwt = require('jsonwebtoken');



//  user register with hashed passwords

router.post('/register', (req,res) =>{
    Users.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length >= 1){
            return res.status(500).json({
                message: 'email already exists'
            });
          }else{
            bcrypt.hash(req.body.password, saltrounds,(err,hash)=>{
                if(err){
                    res.status(500).json({
                        message: err
                    });
                }
                else{
                    const users = new Users({
                        email:req.body.email,
                        password:hash
                    });
                    users.save().then(result =>{
                        console.log(result)
                        res.status(200).json({
                            message:'User created'
                        });
                    }).catch(err=>{
                      console.log(err)
                      res.sendStatus(400).json({
                          message:`user not created beacuse of ${err}`
                      });
                    });
                }
         
            });
        } 
    });  
 });


// login with jwt
router.post('/login', (req,res) =>{
   Users.find({email: req.body.email})
   .then(user =>{
     if(user.length < 1){
        return res.status(500).json({
            message:'failed'
        });
     }
     bcrypt.compare(req.body.password, user[0].password,(err, result) => {
        if(err){
            return res.status(500).json({
                message:'failed'
            }); 
        }
        if(result){
           const token = jwt.sign({
                email:user[0].email,
                id: user.id,
                
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn:'1h'
            }
            );
            return res.status(200).json({
                message: `${result} found`,
                token_key: token
            })
        }
        res.status(500).json({
            message:'failed'
        });
    });
   })
   .catch( err =>{
       res.send(500).json({
           message: `${err}, not found`
       })
   })
});


// delete by id
router.delete('/register/:id', (req,res) =>{
    Users.findByIdAndRemove(req.params.id, (err) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "user successfully deleted",
            id: req.params.id
        };
        return res.status(200).send(response);
    });  
});

// delete all
router.delete('/register', (req,res) =>{
    Users.remove()
    .then(data =>{
        console.log(data)
        res.status(200).json(data)
    })
    .catch(err =>{
        res.send(500).json({
            message:`all ${err} didnt get deleted`
        })
    })
});


module.exports = router;
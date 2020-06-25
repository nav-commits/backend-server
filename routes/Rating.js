const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.js');
const checkAuth = require('../routes/Verify/verify');

// post
router.post('/rating',checkAuth, (req,res) =>{
    const movie = new Movie({
        title:req.body.title,
        rating:req.body.rating
    });
    movie.save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'messaged posted',
            moviecreated: result
        })
    })
    .catch(err =>{
        console.log(err)
        res.send(500).json({
            message: 'didnt make it'
        })
    });
});

// get all data by id
router.get('/rating/:id', (req,res) =>{
    const id = req.params.id;
    Movie.findById(id)
    .then(data =>{
        console.log(data)
        res.status(200).json(data)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message: 'didnt make it'
        })
    });
});


// get all
router.get('/rating', (req,res) =>{
    Movie.find()
    .then(movies =>{
        console.log(movies)
        res.status(200).json(movies)
    })
});


// update by id
router.put('/rating/:id', (req,res) =>{
    Movie.findByIdAndUpdate(req.params.id, req.body, (err, data) =>{
        if (err) return next(err);
        res.json(data);
    })
});

//deleted by id
router.delete('/rating/:id', (req,res) =>{
    Movie.findByIdAndRemove(req.params.id, (err) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "movie successfully deleted",
            id: req.params.id
        };
        return res.status(200).send(response);
    });  
});


// delete all
router.delete('/rating', (req,res) =>{
    Movie.remove()
    .then(movies =>{
        console.log(movies)
        res.status(200).json(movies)
    })
    .catch(err =>{
        res.send(500).json({
            message:`message is ${err}`
        })
    })
});

module.exports = router;
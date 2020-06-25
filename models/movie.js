const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MovieSchema = new Schema({
    
    title: {
        type: String,
    },  
    rating: {
        type: Number,
        min: 0,
        max: 10
    }
  });

  module.exports = mongoose.model('movie', MovieSchema);
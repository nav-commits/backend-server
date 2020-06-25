const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UsersSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        unqiue: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },  
    password: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('users', UsersSchema);
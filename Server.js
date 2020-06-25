const express = require('express');
const app = express();
const movie = require('./routes/Rating.js');
const users = require('./routes/Users.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')

const port = process.env.PORT || 5000;

// enviorment varibles
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;

// database connection
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-2wfnx.mongodb.net/${database}?retryWrites=true&w=majority`,{
 useMongoClient: true 
})
.then(()=>
console.log("connected"))
.catch(err=> console.log(err));

// bodyparsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json())

// cors 
app.use(cors());

// middleware for routes
app.use('/movie', movie);
app.use('/users', users);

// server starter
app.listen(port);
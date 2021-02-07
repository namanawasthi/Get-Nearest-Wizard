const express = require('express');
const bodyParser = require('body-parser');
const routes= require('./routes/api');
const mongoose= require('mongoose');

//set up expresss app
const app= express();

//connect to mongo //db
mongoose.connect('mongodb://localhost/wizardgo',{'useNewUrlParser': true,'useFindAndModify': false,'useUnifiedTopology': true});
mongoose.Promise = global.Promise;

//middleware for render static content like html
app.use(express.static('public'));

//body parser as part of middleware
app.use(bodyParser.json());

//initialise routes middleware
app.use('/api', routes);

//error handline middleware
app.use(function(err,req,res,next){
  res.status(422).send({error: err.message});
});

//listen for request
app.listen(process.env.port || 4000, function(){
  console.log("now listening");
});

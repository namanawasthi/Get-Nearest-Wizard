const express = require('express');
const router = express.Router();
const Wizard= require('../models/wizard');

//get a list of wizards from the DB
router.get('/wizards', function(req,res,next){
//Display all wizards in the database

  /*Wizard.find({}).then(function(wizards){
    res.send(wizards);
  });*/

  /*Wizard.geoNear(
    {type: "Point",coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    {maxDistance: 100000, spherical: true}
  ).then(function(wizards){
    res.send(wizards);
  });*/
  Wizard.aggregate(
    [{
     $geoNear:{
            near: {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
            spherical: true,
            maxDistance: 100000,
            distanceField: "dist.calculated"
           }
   }]).then(function(wizards){ res.send(wizards); });
});

//add a list of wizards in the DB
router.post('/wizards', function(req,res,next){
  Wizard.create(req.body).then(function(wizard){ //  var wizard = new Wizard(req.body); wizard.save(); alternative
    res.send(wizard);
  }).catch(next);
});

//update a wizards in the DB
router.put('/wizards/:id', function(req,res,next){
  Wizard.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
    Wizard.findOne({_id:req.params.id}).then(function(wizard){
    res.send(wizard);
  });
  });
});

//delete a wizards from the DB
router.delete('/wizards/:id', function(req,res,next){
  Wizard.findByIdAndRemove({_id: req.params.id}).then(function(wizard){
    res.send(wizard);
  });
});

module.exports = router;

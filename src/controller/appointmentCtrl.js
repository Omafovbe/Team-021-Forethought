const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const { Appointment, validateAppointment} = require('../models/appointmentSchema');
const { Consultant} = require('../models/consultant');
const { User} = require('../models/user');


const createConsultant = async (req) => {


  try {
        
  let  appointment = new Appointment(_.pick(req, ['consultant_id', 'user_id', 'scheduled_date', 'scheduled_time']));
    
     await appointment.save();
  } catch (error) {
    throw new Error(`Appointment could not be saved: ${error}`);
  }

};




// codes to get all appointments by consultant_id

//router.get('/byConsultantID/:consultant_id', async (req, res) => {

    
  const getAllAppointmentsByConsultantID = async (req) => {
  
    try {
      Appointment.find(req.param.consultantId,function(err, appointment){
        if(err){
          console.log(err);
        }
        else {
          res.json(appointment);
        }
      });
  
    } catch (error) {
  
      res.status(500).send(`appointment could not be found: ${error}`)
  
    }
  
  };

  //codes to get user appointment by id

  //router.get('/userAppointment/:id', async (req, res) => {

    const userAppointmentById = async (req) => {
    try {
     

    
      Appointment.findOne({_id:req.params.id},(err,appointment) =>{
        if(err){
          return res.send(err);
        }
        return res.json(appointment);
    
         });
    
  
    } catch (error) {
  
      res.status(500).send(`appointment could not be located: ${error}`)
  
    }
  
  };

//  router.put('/assignConsultant/:id', async (req, res) => {

  const assignConsultantToUsers = async (req) => {

    let id = req.params.id;
    var data = {
      consultantId : req.body.consultantId
      
    }
   
    // save the user
    User.findByIdAndUpdate(id, data, function(err, user) {
    if (err) throw err;
   
    res.send('Successfully! user updated - '+user.lastname);
    });
 
 };

 //router.get('/getClosestConsultant/:longitude&:latitude', async (req, res) => {
   //get closes consultant by latitude and longitude

   const closestConsultantByLatitudeAndLongitude = async (req) => {
  let lat = parseFloat(req.params.latitude);
  let long = parseFloat(req.params.longitude);  
  
  let locations = [];
  try {
    Consultant.find(function(err, consultant){
      if(err){
        console.log(err);
      }
      else {
        consultant.forEach(function(record){
         // console.log(record.workplace_latitude,record.workplace_longitude);
         //getting distance using the standard haversine formular
         // you can make the api call here or refractor the code if you wish
          let consultantDistances  = distance(lat,long,record.workplaceLatitude,record.workplaceLongitude,'K');
          
          locations.push({id:record.id,distance:consultantDistances});

          
      });
      let lowestDistance = Number.POSITIVE_INFINITY;
      let highestDistance = Number.NEGATIVE_INFINITY;
      let temp;
      let lowestDistanceObject;
      for (let i = locations.length-1;i>=0;i--){
      
       tmp = locations[i].distance;
      if(tmp < lowestDistance) {
      lowestDistanceObject = myArray[i];
      lowestDistance = tmp;
      }
      if(tmp > highestDistance) highestDistance = tmp; }
      
      //save lowestDistanceto database and send to front end
      console.log(highestDistance,lowestDistance,lowestDistanceObject);

       // res.json(consultant);
        res.json(lowestDistanceObject);
      }
    });

  } catch (error) {

    res.status(500).send(`consultant could not be found: ${error}`)

  }

};

//function to get distance using latitude and longitude
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var radlon1 = Math.PI * lon1/180
  var radlon2 = Math.PI * lon2/180
  var theta = lon1-lon2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }
  return dist
}

module.exports = {
  createConsultant,
  closestConsultantByLatitudeAndLongitude,
  assignConsultantToUsers,
  getAllAppointmentsByConsultantID,
  userAppointmentById

  
};
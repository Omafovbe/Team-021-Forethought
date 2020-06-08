const _ = require('lodash');
const Appointment = require('../models/appointmentSchema');
const Consultant = require('../models/consultant');
const User = require('../models/user');


const createConsultant = async (req) => {
  try {
    const appointment = new Appointment(_.pick(req, ['consultant_id', 'user_id', 'scheduled_date', 'scheduled_time']));

    await appointment.save();
  } catch (error) {
    throw new Error(`Appointment could not be saved: ${error}`);
  }
};


// codes to get all appointments by consultant_id

// router.get('/byConsultantID/:consultant_id', async (req, res) => {


const getAllAppointmentsByConsultantID = async (req) => {
  let allAppointment = null;
  try {
    await Appointment.find(req.consultantId, (err, appointment) => {
      if (err) {
        // console.log(err);
        throw new Error(err);
      } else {
        allAppointment = appointment;
      }
    });
  } catch (error) {
    throw new Error(`There was an error: ${error}`);
  }
  return allAppointment;
};

// codes to get user appointment by id

// router.get('/userAppointment/:id', async (req, res) => {

const userAppointmentById = async (req) => {
  let result;
  try {
    Appointment.findOne({ _id: req.params.id }, (err, appointment) => {
      if (err) {
        throw new Error(err);
      }
      result = appointment;
    });
  } catch (error) {
    throw new Error(`appointment could not be located: ${error}`);
  }

  return result;
};

//  router.put('/assignConsultant/:id', async (req, res) => {

const assignConsultantToUsers = async (req) => {
  const { id } = req.params;
  const data = {
    consultantId: req.body.consultantId

  };

  // save the user
  await User.findByIdAndUpdate(id, data, (err, user) => {
    if (err) throw new Error(err);

    return `Successfully! user updated - ${user.lastname}`;
  });
};


// function to get distance using latitude and longitude
function distance(lat1, lon1, lat2, lon2, unit) {
  const radlat1 = Math.PI * (lat1 / 180);
  const radlat2 = Math.PI * (lat2 / 180);
  // const radlon1 = Math.PI * (lon1 / 180);
  // const radlon2 = Math.PI * (lon2 / 180);
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2)
    + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') { dist *= 1.609344; }
  if (unit === 'N') { dist *= 0.8684; }
  return dist;
}

// router.get('/getClosestConsultant/:longitude&:latitude', async (req, res) => {
// get closes consultant by latitude and longitude

const closestConsultantByLatitudeAndLongitude = async (req) => {
  const lat = parseFloat(req.params.latitude);
  const long = parseFloat(req.params.longitude);

  const locations = [];
  try {
    let lowestDistanceObject;
    await Consultant.find((err, consultant) => {
      if (err) {
        console.log(err);
      } else {
        consultant.forEach((record) => {
          // console.log(record.workplace_latitude,record.workplace_longitude);
          // getting distance using the standard haversine formular
          // you can make the api call here or refractor the code if you wish
          const consultantDistances = distance(lat, long, record.workplaceLatitude, record.workplaceLongitude, 'K');

          locations.push({ id: record.id, distance: consultantDistances });
        });
        let lowestDistance = Number.POSITIVE_INFINITY;
        let highestDistance = Number.NEGATIVE_INFINITY;
        let tmp;
        for (let i = locations.length - 1; i >= 0; i -= 1) {
          tmp = locations[i].distance;
          if (tmp < lowestDistance) {
            let myArray;
            lowestDistanceObject = myArray[i];
            lowestDistance = tmp;
          }
          if (tmp > highestDistance) highestDistance = tmp;
        }

        // save lowestDistanceto database and send to front end
        console.log(highestDistance, lowestDistance, lowestDistanceObject);

        // res.json(consultant);
        // return lowestDistanceObject;
      }
      return lowestDistanceObject;
    });
  } catch (error) {
    return `consultant could not be found: ${error}`;
  }
};


module.exports = {
  createConsultant,
  closestConsultantByLatitudeAndLongitude,
  assignConsultantToUsers,
  getAllAppointmentsByConsultantID,
  userAppointmentById


};

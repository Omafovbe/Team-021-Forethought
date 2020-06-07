const express = require('express');

const router = express.Router();
const { vAppointment } = require('../services/validation');
const validateMW = require('../services/validate');
const {
  createConsultant,
  closestConsultantByLatitudeAndLongitude,
  assignConsultantToUsers,
  getAllAppointmentsByConsultantID,
  userAppointmentById
} = require('../controller/appointmentCtrl');


// Register new Appointment
const register = (req, res, next) => {
  createConsultant(req.body)
    .then(() => res.json({ message: 'Registered successfully' }))
    .catch((error) => next(error));
};

// Consultant Routes
router.post('/', validateMW(vAppointment), register);

router.get('/byConsultantID/:consultant_id', getAllAppointmentsByConsultantID);
router.get('/getClosestConsultant/:longitude&:latitude', closestConsultantByLatitudeAndLongitude);
router.get('/userAppointment/:id', userAppointmentById);
router.put('/assignConsultant/:id', assignConsultantToUsers);

// Export Router
module.exports = router;

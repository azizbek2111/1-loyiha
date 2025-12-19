const express = require('express');
const {registerManager, loginManager} = require('../controllers/manager.controller');
const router = express.Router();    
router.post('/register', registerManager);
router.post('/login', loginManager);
module.exports = {
    managerRouter: router
};  

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Imported the userController module which contains the route handler functions
const userController = require('../controllers/user/userControl');
const userRegistration = require('../controllers/user/userRigistration');
const userLogin = require('../controllers/user/userLogin');

router.get('/', userController.lodeHomePage);

// User login controllers
router.get('/login', userLogin.loginLoad);
router.post('/login', userLogin.userVerification);

// User register controllers
router.get('/register', userRegistration.loadRegister);
router.post('/register', userRegistration.registerUser);

// OTP page and verification
router.get('/OTP', userRegistration.lodeOTPpage);
router.post('/OTP', userRegistration.verifiyingOTP);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/product', userController.loadProductDetails);
router.get('/cart', userController.loadCart);
router.get('/pro', userController.profile);

module.exports = router;

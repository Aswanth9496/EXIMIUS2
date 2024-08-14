const User = require('../../models/userModel');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
            return done(null, existingUser);
        }

        // If user doesn't exist, create a new one
        const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            verified: true
        });

        await newUser.save();
        return done(null, newUser);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Load user login page
const loginLoad = async (req, res) => {
    try {
        res.render('login.ejs', { message: req.flash('error') });
    } catch (error) {
        console.log(error.message);
    }
}

// Verify the user (traditional login)
const userVerification = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ Email: email });

        if (existingUser) {
            if (password === existingUser.password) {
                req.session.user = {
                    id: existingUser._id,
                    username: existingUser.name                   
                };
                res.render('home.ejs');
            } else {
                res.render('login.ejs', { message: "Incorrect password" });
                console.log('incorrect pass');
                
            }
        } else {
            res.render('login.ejs', { message: "Invalid user" });
            console.log('invalid use');
            
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loginLoad,
    userVerification
}

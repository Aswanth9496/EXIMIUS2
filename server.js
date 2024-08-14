require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

// Set 'public' as the static folder
app.use(express.static(path.join(__dirname, './public/user')))
app.use('/admin', express.static(path.join(__dirname, './public/admin')))

// Morgan for logging
app.use(morgan('dev'));

// Express session setup
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.set('views', path.join(__dirname, 'views/user'));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import the routes from the routes directory
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')

const dbConnect = require('./config/db.Connect');
// MongoDB connection
dbConnect();

app.use('/', userRoutes);
app.use('/admin', adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

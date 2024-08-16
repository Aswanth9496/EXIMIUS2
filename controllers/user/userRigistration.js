const User = require('../../models/userModel');
const nodemailer = require('nodemailer');
const session = require('express-session');


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER, 
        pass: process.env.PASS
    }
});


// Function to generate OTP
function generateOTP() {
    let otp = '';
    const digits = '0123456789';
    for (let i = 0; i < 4; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

// Send email function
const sendMail = (to, text) => {
    const mailOptions = {
        from: process.env.USER, 
        to: to, 
        subject: "OTP verification",
        text: `your oto is ${text}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending email: ', error);
        }
        console.log('Email sent: ');
    });
};

// Load user registration form
const loadRegister = async (req, res) => {
    try {
        res.render('userRegister.ejs', { message: null });
    } catch (error) {
        console.log(error.message);
    }
}

// User registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
      
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.render('userRegister.ejs', { message: "Email already exists" });
        }else{

        let OTP = generateOTP();

         // Send OTP to user's email
         sendMail(email, OTP);


         // Store user data in session
         req.session.user = {
            name: name,
            email: email,
            password:password,
            mobile:mobile
        };
      
       
        
         // Store OTP in session or temporary storage 
        req.session.otp = OTP;
       
        res.redirect('/OTP'); // Redirect to OTP page
        }
 
        

    } catch (error) {
        console.log(error.message);
        res.render('userRegister.ejs', { message: "An error occurred during registration" });
    }
}

// Load OTP page
const lodeOTPpage = async (req, res) => {
    try {
        res.render('OTP.ejs');
    } catch (error) {
        console.log(error.message);
    }
}


//verifiying OTP
const verifiyingOTP = async (req,res)=>{
    try {

        let OTP = req.body.otp1 + req.body.otp2 + req.body.otp3 + req.body.otp4;
               
             
        if (req.session.otp === OTP) {

            const { name, email, password, mobile } = req.session.user;
             
            const newUser = new User({
                name,
                email,
                password,
                mobile,
                verified: true // Set user as verified
            });

            await newUser.save();

              // Clear the session data
              req.session.otp = null;
              req.session.user = null;

            res.redirect('/');

        }else{

             // OTP is incorrect
            res.render('OTP.ejs', { message: "Invalid OTP, please try again" });
        }

    } catch (error) {
        console.log(error.message);
    }
};


const resendOTP = async (req,res)=>{
    try {

       let newOTP = generateOTP();
      
       let email = req.session.user.email;
       req.session.otp = newOTP;
            
       sendMail(email, newOTP);
       res.render('OTP.ejs', { message: "otp resend sucessfull" });

    } catch (error) {
        console.log(error);
        
    }
}


module.exports ={
    lodeOTPpage,
    verifiyingOTP,
    loadRegister,
    registerUser,
    resendOTP
}
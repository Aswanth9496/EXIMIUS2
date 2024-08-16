const Admin = require('../../models/adminModel')


// load the login 
const loadAdminLoginPage = async (req,res)=>{
    try {
        res.render('adminLogin')
    } catch (error) {
        console.log(error);
        
    }
}

// admin verification
const verifyadmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingAdmin = await Admin.findOne({email});
        
        if (existingAdmin) {
            // Check if password matches
            if (password === existingAdmin.password) {
                res.redirect('/admin/dashbord');
            } else {
                // Incorrect password, show SweetAlert
                res.render('adminLogin', { message: "Incorrect password", alertType: "error" });
            }
        } else {
            // Invalid admin email, show SweetAlert
            console.log('user not found');
            
            res.render('adminLogin', { message: "Invalid Admin ID", alertType: "error" });
        }
    } catch (error) {
        console.log(error);
        res.render('adminLogin', { message: "Server error", alertType: "error" });
    }
};




// laad admin dashbord
const loadDashbord = async (req,res)=>{
    try {
          
        res.render('dashbord.ejs')

    } catch (error) {

        console.log(error.massage);
        
    }
};

// logout
const adminLogout = async(req,res)=>{
    try {
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
        
    }
}


module.exports={
    loadDashbord,
    loadAdminLoginPage,
    verifyadmin,
    adminLogout
}
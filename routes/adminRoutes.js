const express =require('express');
const app = express();


app.set('view engine','ejs');
app.set('views','./views/Admin');

const brandControl = require('../controllers/admin/brandControl');
const adminController = require('../controllers/admin/adminController');
const UserController  = require('../controllers/admin/UsersControllers');
const CategoryController = require('../controllers/admin/CategoryManagement');


//admin login
app.get('/',adminController.loadAdminLoginPage);
app.post('/login', adminController.verifyadmin);

// logout
app.get('/logout',adminController.adminLogout);

// load admin dashbord
app.get('/dashbord',adminController.loadDashbord);

// for brand 
app.get('/brands',brandControl.loadBrands);
app.post('/add-brand', brandControl.addBrand);

// for category
app.get('/Category',CategoryController.loadCategoryManagementPage);
app.post('/addCategory',CategoryController.addCategory);
app.post('/toggle-category-status',CategoryController.toggleCategoryStatus);
// for user management
app.get('/Users',UserController.LoadUserManagement);
app.post('/Users',UserController.blockUser);


module.exports = app ;














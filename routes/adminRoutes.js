const express =require('express');
const app = express();


app.set('view engine','ejs');
app.set('views','./views/Admin');

const brandControl = require('../controllers/admin/brandControl');
const adminController = require('../controllers/admin/adminController');
const UserController  = require('../controllers/admin/UsersControllers');
const CategoryController = require('../controllers/admin/CategoryManagement');
const productController = require('../controllers/admin/productsController');

const upload = require('../config/multer');

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
app.post('/update-brand/:brandId', brandControl.updateBrand);
app.post('/toggle-status/:brandId', brandControl.toggleStatus);

// for category
app.get('/Category',CategoryController.loadCategoryManagementPage);
app.post('/addCategory',CategoryController.addCategory);
app.post('/toggle-category-status',CategoryController.toggleStatus);
app.post('/update-category-name', CategoryController.updateCategoryName);

// for user management
app.get('/Users',UserController.LoadUserManagement);
app.post('/Users',UserController.blockUser);


//products
app.get('/Product',productController.loadProductsPage);
app.get('/add-product',productController.loadAddproduct);
app.post('/add-product',upload.array('productimage', 3),productController.addProduct);


module.exports = app ;














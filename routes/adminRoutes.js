const express =require('express');
const app = express();


app.set('view engine','ejs');
app.set('views','./views/Admin')

const adminControl = require('../controllers/admin/adminControl');

app.get('/',adminControl.loadDashbord);

app.get('/brands',adminControl.loadBrands);





module.exports = app ;














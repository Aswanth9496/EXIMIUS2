const mongoose = require('mongoose');



const brandShema = new mongoose.Schema({

    BrandName :{
        type: String,
        required: true,
      },
      discription:{
        type : String,
        required:true
      }
});


module.exports = mongoose.model('Brand', brandShema);


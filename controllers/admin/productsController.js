const products = require('../../models/productsModel');
const category =require('../../models/categoryModel');
const brand =require('../../models/brandModel');


// load the product page
const loadProductsPage = async (req,res)=>{
    try {
        const product = await products.find().populate("category").populate("brand")

        res.render('products',{product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' }); 
    }
};


// for loading the add product page
const loadAddproduct = async(req,res)=>{
    try {
        const categorys = await category.find();
        const brands = await brand.find();

        res.render('addProducts',{categorys,brands});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' }); 
    }
};



const addProduct = async (req, res) => {
    try {
      const { productName, branded, category,quantity, price, description} = req.body;
  console.log(req.body);
  
      // Check if required fields are provided
      if (!productName || !branded || !category || !quantity || !description || price === undefined) {
        return res.status(400).send('All fields are required.');
      }
  
     
      // Process the uploaded images
      const images = req.files.map(file => file.path);
     
      // Check if the product already exists
      const productExist = await products.findOne({  name:productName });
      if (productExist) {
        return res.status(400).send('Product already exists');
      }
  
      // Create a new product
      const newProduct = new products({
        name:productName,
        productimages: images,
        brand:branded,
        category:category,
        quantity:quantity,
        discription:description,
        price:price,
        listed: true 
      });
  
      // Save the product to the database
      await newProduct.save();
      res.redirect('/admin/product');
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


 
  

module.exports ={
    loadProductsPage,
    addProduct,
    loadAddproduct
   
}
const Brand = require('../../models/brandModel');


// lade the brand page
const loadBrands = async (req,res)=>{
    try {
        const brands = await Brand.find();
        res.render('brands.ejs',{ brands })

    } catch (error) {

        console.log(error.massage);
        
    }
};


// addd a new brand
const addBrand = (req, res) => {
    const { brandName, brandDescription } = req.body;

    const newBrand = new Brand({
        BrandName: brandName,
        description: brandDescription,
        status: 'Active'  // Default status
    });

    newBrand.save()
        .then(() => {
            res.redirect('/admin/brands');  // Redirect to the brands page after saving
        })
        .catch(err => {
            console.error('Error adding brand:', err);
            res.status(500).send('Internal Server Error');
        });
};




module.exports ={
    loadBrands,
    addBrand
}
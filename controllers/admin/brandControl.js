const Brand = require('../../models/brandModel');


// lade the brand page
const loadBrands = async (req,res)=>{
    try {
        const brands = await Brand.find();
        res.render('brands.ejs',{ brands })

    } catch (error) {

        console.log(error.massage);
        res.status(500).send('Server Error');
    }
};


// addd a new brand
const addBrand = async (req, res) => {
    try{
    const { brandName, brandDescription } = req.body;
    const existingBrand = await Brand.findOne({ BrandName: brandName });

     // Check if the brand already exists
    if (existingBrand) {
        return res.status(400).send('Brand already exists');
    }


    const newBrand = new Brand({
        BrandName: brandName,
        description: brandDescription,
        status: 'Active'  
    });

    newBrand.save()
        .then(() => {
            res.redirect('/admin/brands');  
        })
        .catch(err => {
            console.error('Error adding brand:', err);
            res.status(500).send('Internal Server Error');
        });
    }catch{
        res.status(500).send('Server Error');
    }
};

// update brand
const updateBrand = async (req, res) => {
    try {
        const { brandName, brandDescription } = req.body;
        const { brandId } = req.params;
       
        
        

        if (!brandId) {
            return res.status(400).json({ message: 'Brand ID is required' });
        }

        // Update brand
        await Brand.findByIdAndUpdate(brandId, {
            BrandName: brandName,
            description: brandDescription
        });
         

        res.status(200).json({success:true, message: 'Brand updated successfully' });
    } catch (err) {
        console.error('Error updating brand:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const toggleStatus = async (req, res) => {
    try {
        const brandId = req.params.brandId ;
        console.log(brandId);
        
        // Find the brand by ID
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        // Toggle the status
        brand.status = brand.status === 'Active' ? 'Inactive' : 'Active';
        await brand.save();

        res.status(200).json({ message: 'Status updated successfully', status: brand.status });
    } catch (err) {
        console.error('Error toggling brand status:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports ={
    loadBrands,
    addBrand,
    updateBrand,
    toggleStatus
}
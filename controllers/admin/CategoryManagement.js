const Category = require('../../models/categoryModel');


const loadCategoryManagementPage = async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('Category', { categories });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};



// Add a new category
const addCategory = async (req, res) => {
    try {
        const { categoryName, categoryStatus } = req.body;

        if (!categoryName) {
            req.flash('error', 'Category name is required');
            return res.redirect('/admin/category');
        }

        const CategoryExist = await Category.findOne({ name: categoryName });
        if (CategoryExist) {
            req.flash('error', 'Category already exists');
            return res.redirect('/admin/category');
        }

        const newCategory = new Category({
            name: categoryName,
            status: categoryStatus === 'true' // Convert the status string to a boolean
        });

        await newCategory.save();
        res.redirect('/admin/category');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};


// list and unlist
const toggleStatus = async (req, res) => {
    try {
        const { categoryId, status } = req.body;
        console.log(req.body);
        
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        category.status = status === 'list' ? true : false;
        await category.save();

        res.json({ success: true, message: 'Category status updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


// update the category
const updateCategoryName = async (req, res) => {
    try {
        const { categoryId, categoryName } = req.body;

        // Log the incoming form data
        console.log('Category ID:', categoryId);
        console.log('New Name:', categoryName);

        if (!categoryId || !categoryName) {
            req.flash('error', 'Category ID and new name are required');
            return res.status(400).json({type:'error', msg:"Category name jis required"})
        }

        const category = await Category.findById(categoryId);

        if (!category) {
           return  res.status(400).json({type:'error', msg:"category not found"})
        }

        // Update category name
        category.name = categoryName;
        const  data = await category.save();

        res.status(200).json({type:'success', msg:"Successfuly updated"})
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};



module.exports ={
    loadCategoryManagementPage,
    addCategory,
    toggleStatus,
    updateCategoryName
}


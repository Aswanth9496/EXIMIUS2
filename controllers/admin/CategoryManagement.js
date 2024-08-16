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



const toggleCategoryStatus = async (req, res) => {
    try {
        const { categoryId, status } = req.body;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        category.status = status === 'list' ? true : false;
        await category.save();
        res.send({ success: true, status: category.status });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};


module.exports ={
    loadCategoryManagementPage,
    addCategory,
    toggleCategoryStatus
}


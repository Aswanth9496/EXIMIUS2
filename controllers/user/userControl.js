

// Load home page
const lodeHomePage = async (req, res) => {
    try {
        if (req.session.user) { 
            return res.redirect('/');
        }
        res.render('home.ejs');
    } catch (error) {
        console.log(error.message);
    }
}

// load product details
const loadProductDetails =async (req,res)=>{
         try {
            await res.render('productDetails.ejs')
         } catch (error) {
            console.log(error.message);
            
         }
};

//load user cart
const loadCart =async (req,res)=>{
    try {
        await res.render('cart.ejs')
    } catch (error) {
        console.log(error);
        
    }
};


const profile =async (req,res)=>{
    try {
        await res.render('userProfile.ejs')
    } catch (error) {
        console.log(error);
        
    }
};

module.exports = {
    lodeHomePage,
    loadProductDetails,
    loadCart,
    profile
}















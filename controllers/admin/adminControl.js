


const loadDashbord = async (req,res)=>{
    try {

        res.render('dashbord.ejs')

    } catch (error) {

        console.log(error.massage);
        
    }
}


const loadBrands = async (req,res)=>{
    try {

        res.render('orders.ejs')

    } catch (error) {

        console.log(error.massage);
        
    }
}




module.exports ={
    loadDashbord,
    loadBrands
}
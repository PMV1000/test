import product from "../model/product.js";

export const search = async (req,res)=>{
    
    try{
        // const response =await product.findOne()
        // const cartData= response.json();
        // console.log(cartData)
    res.render('search');    
    }
    catch(err){}
}
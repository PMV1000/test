import product from "../model/product.js";

export const search = async (req,res)=>{
    
    try{
        const response =await product.find()
       
        const Prekey = req.query.searchkey; // với get là query thay vì body 
        console.log(Prekey,"key")
        if(Prekey){
        const key =Prekey.toUpperCase().replace(/\s+/g,'')
        console.log("có key")
        const Resproduct = response.filter(item=>item.name.toUpperCase().replace(/\s+/g,'').includes(key))
        console.log(Resproduct) 
        res.render('search',{resuits:Resproduct});  
        }
      
        
     
    }
    catch(err){
        console.error("Error Search Product: ",err)
    }
}
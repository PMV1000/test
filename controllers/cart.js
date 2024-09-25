import cart from '../model/cart.js'
import product from '../model/product.js'
import user from '../model/user.js'


export const show = async (req,res)=>{
    try{// code đã tối ưu 
        if(req.cookies.code){
            const User = await user.findOne({code:req.cookies.code})
            if(User.typeAccount!=="user"){
                res.send("Giỏ Hàng Chỉ Áp Dụng Cho Tài Khoản Người Dùng")
                console.log("hU")
            }
           
        const cartData = await cart.findOne({ userId:  User.id });

        if (!cartData) {
            return res.status(404).send('Cart not found');
        }
        const productDataPromises = cartData.products.map(async (item) => {
            const productd = await product.findOne({ id: item.productId,deleted:false });
            return [productd, item.quantity];
        });
    
     
        const productData = await Promise.all(productDataPromises);
        // res.local.productData=productData
        const total = Math.round(compute(productData));
       
     
        res.render('cart', { data: productData, total,user:User });
        } 
        else{
            redirect("/login")
        }

        
        
    }

    catch(err){
        console.log (err);
    }



}


export const compute = (productData) => {
    return productData.reduce((total, item) => {
      return total + item[0].price * item[0].discount / 100 * item[1];
    }, 0);
  };


export const remove = async (req,res,)=>{
    const User = await user.findOne({code:req.cookies.code})
    
    const productId = req.body.productId

    await cart.updateOne(
        {  userId:User.id},
        { $pull: { products: { productId: productId } } }
    );
    
    res.redirect('/cart',{user:User})
 


}



export const removeMutiple = (req,res)=>{
    const Ids = req.body.Ids;
    console.log(Ids,"od")
    const ArrId =Ids.split(",")
    ArrId.forEach(id=>{
        if(id){
            remove(id)
        }
    })
    
}
  
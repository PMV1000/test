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
      
            res.redirect("/login")
        }

        
        
    }

    catch(err){
        console.log (err);
    }



}


export const compute = (productData) => {
    console.log(productData)
    return productData.reduce((total, item) => {
        console.log("total",total, `${item[1]} cái giá ${item[0].price * parseInt((1-item[0].discount / 100).toFixed(3),10)}`)
      return total + parseInt((item[0].price * (1-item[0].discount / 100)).toFixed(3),10) * item[1];
    }, 0);
  };


export const remove = async (req,res,)=>{
    const User = req.body.UserId;
    // await user.findOne({code:req.cookies.code})
    console.log(req.body.UserId)
    
    const productId = req.body.productId

    await cart.updateOne(
        {  userId:User},
        { $pull: { products: { productId: productId } } }
    );
    
    res.redirect('/cart')
 


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

export const changeQuan =async  (req,res)=>{
    try{
        const {quantity ,productId ,cartId}= req.query;
       
        console.log("Thông tin:", productId, "-",quantity, "-", cartId)
    //    const result= await cart.updateOne({ userId:userId,"products.productId":productId},
    //         {$set:{"products.$.quantity":quan}})
          
            
    //         //đoạn check
    //         if (result.modifiedCount > 0) {
    //         return res.json({ success: true, message: 'Cập nhật thành công' });
    //     } else {
    //         return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
    //     }
     }
    catch (error) {
      console.error("Lỗi:", error);
      return res.status(500).json({ success: false, message: 'Có lỗi xảy ra' });
    }
  

}
  
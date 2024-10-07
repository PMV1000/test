import product from '../model/product.js';
import user from '../model/user.js'
import cart from '../model/cart.js'
export const show = async (req, res) => {
    const Message = []
    try {
        var User=null
        if(req.cookies.code){
             User = await user.findOne({code:req.cookies.code})
        }

        const response = await product.findOne({ deleted: false, id: req.params.id });
        console.log(response)
      
        if (response) {
            if(req.cookies.code){
                const User = await user.findOne({code:req.cookies.code})
                res.render('productDetail', { products: response,user:User });
            }
            else{
                if(req.cookies.Login){
                Message[0]="Bạn Chưa đăng nhập"
               

                }
             res.render('productDetail', { products: response,Message: Message,user:User})
               
};
        }
        else {
            res.send('Sản phẩm bạn đang tìm không tồn tại hoặc đã bị xóa.');
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Có lỗi xảy ra khi tìm kiếm sản phẩm.');
    }
    
};

export const addToCart = async(req,res)=>{
    const Id = req.body.id;
    if(req.cookies.code){
        const User = await user.findOne({code:req.cookies.code})
        const Cart = await cart.updateOne({userId:User.id},{
            $set:{products:{productId:Id, quantity:1}}
        })
   
    }
    else{
        res.cookie("Login","have not login",{expires:new Date(Date.now()+5000)})
        
    }
    res.redirect(`/productDetail/${Id}`)
}


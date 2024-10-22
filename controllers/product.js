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
    const quan =req.body.quantity
    if(req.cookies.code){
        const User = await user.findOne({code:req.cookies.code})
        const Cart = await cart.findOne({userId:User.id})
        console.log(Cart, "c")
        if(!Cart.products.find(item=>item.productId===Id)){
            await cart.updateOne({userId:User.id},{
                $push:{products:{productId:Id, quantity:parseInt(quan,10)}}
            })
        }
        else{
            await cart.updateOne({userId:User.id, "products.productId":Id},
                {$inc:{"products.$.quantity":parseInt(quan,10)}}
            )
            
        }


        res.redirect("/cart")
    }
    else{
        res.cookie("Login","have not login",{expires:new Date(Date.now()+5000)})
        res.redirect(`/productDetail/${Id}`)
    }
    
}


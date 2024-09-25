import FeatureProduct from '../model/feature.js';  
import product from '../model/product.js';
import user from "../model/user.js"
export const show = async (req, res) => {
    const currentpage= (req.params.page)?parseInt(req.params.page,10):1;
    try {
        const feature = await FeatureProduct.findOne()
        // không thể dùng skip hoặc limit do cách thức tổ chức đối tượng trong bản ghi sai
        const QuanPage=  Math.round(feature.productIds.length/8)
        console.log(QuanPage, typeof QuanPage)
        if (!feature) {
            return res.status(404).send('Feature not found');
        }

        const products = await product.find({id: { $in: feature.productIds.slice(8*(currentpage-1),8*currentpage) } }).exec();
        if(req.cookies.code){
        const User = await user.findOne({code:req.cookies.code})
    
     
         if(User.typeAccount==="contentadmin"||User.typeAccount==="admin"){
            res.redirect('/admin')
        }
        else{
        res.render('home', { products ,User:User,currentpage,quanPage:(QuanPage<9)?9:QuanPage});}
         }
        else{
            res.render('home', { products,currentpage,quanPage:(QuanPage<9)?9:QuanPage });
        }
        
        

    } catch (err) {
        console.error(err); // Log lỗi chi tiết để dễ chẩn đoán
        res.status(500).send('Server Error');
    }

    
};

export const editInfo =async(req,res)=>{
    const id=req.body.id
    const userName = req.body.username
    const email = req.body.email
    await user.updateOne({id:id},{$set:{userName:userName,email:email}})
    console.log("back")
    res.redirect("back")

}

export const editPassword =async(req,res)=>{
    const id=req.body.id
    const oldPass= req.body.oldPass
    const newPass = req.body.NewPass
    if(await user.findOne({id:id,password:oldPass})){
        await user.updateOne({id:id},{$set:{password:newPass}})
        console.log("back")
        
    }
    else{
        res.cookies("errorPassWordEdit","sai mật khẩu",{expires:new Date(Date.now()+15000)})
    }
    res.redirect("back")
}


export const logout = async (req,res)=>{
    const id=req.body.id
    if(await user.findOne({id:id})){
        await user.updateOne({id:id},{$set:{code:null}})
        res.clearCookie('code', { path: '/' });
        

        
    }
    res.redirect('/login')
}
import user from "../model/user.js"
import category from "../model/category.js"
import product from "../model/product.js"
import rights from "../model/rights.js"
import { nanoid } from 'nanoid';

export const show =async (req,res)=>{
    const response = await user.find() 
    const Rights = await rights.findOne({})
    const errorAddAdmin = req.cookies.errorAddAdmin || null
    if(req.cookies.code){
        const Response = await user.findOne({code:req.cookies.code})
        if(Response.typeAccount==="admin"){
            
            res.render('admin',{info:Response,Rights:Rights,user:response,errorAddAdmin:errorAddAdmin})
        }
        else if(Response.typeAccount==="contentadmin"){
            res.render('admin',{info:Response,Rights:Rights.typeOfSubAccount[0].rights,user:response,errorAddAdmin:errorAddAdmin,type:"contentAdmin"})
        }
        else {
            res.redirect('/')
        }

    }

    else{
        res.redirect('/login')
    }

   

}


export const Showcategory = async (req,res)=>{
    var Reponse = null
    if(req.cookies.code){
        Reponse = await user.findOne({code:req.cookies.code})
        
        if(!Reponse||(Reponse.typeAccount!=="admin" && Reponse.typeAccount!=="contentadmin")){
            
            res.redirect('/login')
        }
        
        const Error = [];
        const Category = await category.find({deleted:false})
        const CatName=await  Category.map(cat=>{return [cat.name,cat.id]})
        const PromisePro = Category.map(async(item)=>{
            const temp= await Promise.all( item.products.map(async (pro)=>{
                const prod = await product.findOne({id:pro,deleted:false})
                if(prod){
                return [prod.id,prod.name]}
            }))
        
            
            return temp;
        })
        const CategoryChild = await Promise.all( Category.map(async(item)=>{
            const temp = await Promise.all(item.categoryChild.map(async (cat)=>{
                const child = await category.findOne({id:cat, deleted:false})
                
                    if(child){
                    return [child.name, child.id]}
                    
            }

            ))
            return temp
        }))

        const productInCategory =await  Promise.all(PromisePro)
        if(req.cookies.errorAddCategory){
            Error[0]=req.cookies.errorAddCategory

        }
        if(req.cookies.errorAddProductToCaTegory){
            Error[1]=req.cookies.errorAddProductToCaTegory
        }

        const Rights = await rights.findOne({})
        if(Reponse&&Reponse.typeAccount=="contentadmin"){
            res.render('adminCategory',{category:CatName,productInCategory:productInCategory,Rights:Rights.typeOfSubAccount[0].rights ,error:Error,CategoryChild:CategoryChild,User:Reponse})
        }
        else{
        res.render('adminCategory',{category:CatName,productInCategory:productInCategory ,error:Error,CategoryChild:CategoryChild,User:Reponse})
    }
 }
 else{
    res.redirect('/login')
 }
}


export const AddCategory = async (req,res)=>{
    const name = req.body.category;
    const exist= await category.countDocuments({name:name})
 
    if(parseInt(exist, 10)>0){
        res.cookie("errorAddCategory"," existed",{expires:new Date(Date.now()+5000),httpOnly:true})
        res.redirect('/admin/manageCategory')
    }
    
    else{
        const id= await category.countDocuments()
      if(req.body.Supcategory)
        {
            // console.log(typeof req.body.Supcategory, "sd" ,req.body.Supcategory)
        await category.updateOne({id:req.body.Supcategory},{
                $push: { categoryChild:"category"+(id+1) }
            })
        }
        
        const NewCat = new category({id:"category"+(id+1),name:name,products:[],categoryChild:[]})
        await NewCat.save();
        res.redirect('/admin/manageCategory')
}


}


export const removeCategory = async (req,res)=>{
    const id =req.body.category;
    await category.updateOne({id:id},{
        $set:{ deleted:true}
    })

    res.redirect('/admin/manageCategory')

}

export const editCategory = async (req,res)=>{
    const Supcategory = req.body.Supcategory;
    const Category = req.body.category;
    const id = req.body.id;
    await category.updateOne({id:id},{$set:{name:Category} })

    const response = await category.findOne({id:Supcategory});
    if(!response. categoryChild.includes(id)){
        await category.updateOne({id:Supcategory},{$push:{ categoryChild:id}})
    }
    res.redirect("/admin/manageCategory")
}

export const removeChild = async (req,res) =>{
    const id = req.body.id
    const supid = req.body.supId
    await category.updateOne({id:supid},{$pull:{categoryChild:id}})
    res.redirect('/admin/manageCategory')
}


export const addChild = async (req,res) =>{
    const id = req.body.id
    const supid = req.body.supId
   await category.updateOne({id:supid},{$push:{categoryChild:id}})
    
    res.redirect('/admin/manageCategory')
}


export const manageCatRMPro = async(req,res)=>{
    const Category = req.body.category
    const product = req.body.product
   const re= await category.updateOne({id:Category},{$pull:{products:product}})
    res.redirect("/admin/manageCategory")
}


export const manageCatAddPro = async (req,res)=>{
    const Product = req.body.product
    const Cate = req.body.category
    const check = await product.countDocuments({id:Product,deleted:false})
    if(check>0){
        const response = await category.findOne({id:Cate})
        if(!response.products.includes(Product)){
            const r = await category.updateOne({ id: Cate }, { $push: { products: Product } });

           console.log(r , ';' ,Product)
        }
    }
    else{
        res.cookie("errorAddProductToCaTegory","not exist",{expires:new Date(Date.now()+5000),httpOnly:true})
    }
    res.redirect("/admin/manageCategory")
}
export const Showproduct = async (req,res)=>{
    var Reponse = null
    if(req.cookies.code){
        Reponse = await user.findOne({code:req.cookies.code})
        if(!Reponse||(Reponse.typeAccount!=="admin"&&Reponse.typeAccount!=="contentadmin")){
          
            res.redirect('/login')
        }
    
    const Product= await product.find()
    const Category = await category.find({deleted:false})
    const cate = await Category.map(item=>{return [item.name,item.id]})

    const Rights = await rights.findOne({})
    if(!Reponse){
        res.redirect("/login")
    }
    else{

    if(Reponse.typeAccount=="contentadmin"){
        res.render('adminProduct',{products:Product,category:cate,Rights:Rights.typeOfSubAccount[0].rights,User:Reponse})  
    }
    else{
    res.render('adminProduct',{products:Product,category:cate,User:Reponse})
}}

}
else{
    res.redirect('/login')
 }

} 

export const addProduct =  async (req,res,imageUploads)=>{
    const id = await product.countDocuments()
    const name= req.body.product
    const desc = req.body.desc
    const price = req.body.price
    const Cate = req.body.category
    const img =imageUploads
    const New = new product ({id:`${nanoid()}${id}`,deleted:false,name:name, price:price,decs:desc,imageURL:img,categoryId:Cate})
    New.save()
    res.redirect('back')
 
}
export const editProduct =  async (req,res,imageUploads)=>{
    const id = req.body.id
    const name= req.body.product
    const desc = req.body.desc
    const price = req.body.price
    const img =imageUploads
   await product.updateOne({id:id},{$set:{name:name,price:price,decs:desc,imageURL:img}})
    res.redirect('back')
 
}

export const removeImage = async (req,res)=>{
    const info = req.body.Info.split("Of")
    console.log("hii",info)
    // await product.updateOne({id:info[1]},{$pull:{imageURL:imageURL[info[0]]}})
    res.redirect('back')
}

export const removeProduct = async (req,res)=>{
    const id = req.body.id
    const r= await product.updateOne({id:id},{$set:{deleted:true}})
    res.redirect("/admin/manageProduct")

}



export const addAdmin =async (req,res)=>{
    const userName= req.body.username;
    const email= req.body.email;
    const Survive = req.body.survive||true;
    const type =  req.body.type;
    if(Survive===true){
        const updateResponse = await user.updateOne(
            { email: email, userName: userName },
            { $set: { typeAccount: type } }
        );

        if(updateResponse.modifiedCount === 0){
            res.cookie("errorAddAdmin","not exist",{expires:new Date(Date.now()+5000),httpOnly:true})
        }
     res.redirect('/admin')
        
    }
    else if(Survive===false){
        const id = await user.countDocuments()
        const Id= 'user'+(id+1);
        const password = req.body.password;
        const newAdmin = new user({
            id: Id,
            typeAccount: type,
            userName: userName,
            password: password,
            email: email,
            code: null
        });
         await newAdmin.save()
         res.redirect('/admin')
    }
   
}


// Xóa luôn khỏi cơ sở dữ liệu
export const removeUser = async (req,res)=>{
    const idRM = req.body.UserId;
   
    await user.deleteOne({id:idRM})

    res.redirect('/admin')

}


export const setRight = async (req,res)=>{
    const name = req.query.rightName
    const value = req.query.rightValue
    const booleanValue = (value === "true"); 
    const Response = await rights.findOne()
    const Resuit = [{...Response.typeOfSubAccount[0], rights:Response.typeOfSubAccount[0].rights.map(r=>{
        
            

        if(r.name===name){
            console.log("vôo",booleanValue)
            console.log({name:r.name,value:booleanValue }   , "đây" )
            return {name:r.name,value:booleanValue }  //chuyển sang boolean
            
        }
        else{ return r}
    }) }]

    
    const re = await rights.updateOne({ _id: Response._id }, { $set: { typeOfSubAccount: Resuit } });
   console.log(Response.typeOfSubAccount[0].rights,re)
   res.redirect("back")

}
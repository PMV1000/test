import category from '../model/category.js'
import product from '../model/product.js'
import user from '../model/user.js'

export const show = async (req,res)=>{
    const Temp= await category.find({deleted:false })
    const childCat = {};
    var categoryData =Temp
    Temp.map(cat=>{
      if(cat.categoryChild.length>0){
        childCat[cat.id] = {}; // cần phải khởi tạo mảng cấp 2 trước
        cat.categoryChild.map(child=>{
          // console.log(child)
          categoryData=categoryData.filter(cate=>cate.id!==child)
          // console.log(categoryData)
          childCat[cat.id][child] = Temp.find(catg => catg.id === child);
          

          
        })
      }
    

    })
    


    const productData = await product.find()
  
    const reverse=productData.slice(20,50).reverse()
    if(req.cookies.code){
      const User = await user.findOne({code:req.cookies.code})
      res.render('category',{categoryData:categoryData ,productData:reverse,childCats:childCat,user:User})
    }
    else{
    res.render('category',{categoryData:categoryData ,productData:reverse,childCats:childCat})
  }

}

export const findProductOfCat = async (req,res)=>{
  const Temp= await category.find({deleted:false })
    const childCat = {};
    var categoryData =Temp
    Temp.map(cat=>{
      if(cat.categoryChild.length>0){
        childCat[cat.id] = {}; // cần phải khởi tạo mảng cấp 2 trước
        cat.categoryChild.map(child=>{
          categoryData=categoryData.filter(cate=>cate.id!==child)
               childCat[cat.id][child] = Temp.find(catg => catg.id === child);
          

          
        })
      }
    

    })
    




  const cat=req.params.categoryId
  const currentCategory = await category.findOne({id:cat,deleted:false })
  const ProPromise =currentCategory.products.map(async (pro)=>{
      const temp = await product.findOne({id:pro})
      return temp
    } )
  const productData = await Promise.all(ProPromise)
 

  res.render('category',{categoryData:categoryData,productData:productData,childCats:childCat})
}
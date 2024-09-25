import user from'../model/user.js'

export const show= async (req,res)=>{
    if(req.cookies.code){
        const User = await user.findOne({code:req.cookies.code})
        res.render("payment",{user:User})
    }
    else{
    res.render("payment")}
}

export const confirm =(req,res)=>{
    res.render('thankyou')
}
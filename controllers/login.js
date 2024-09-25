import user from "../model/user.js"
import { nanoid } from 'nanoid';
import cart from '../model/cart.js'
export const show= (req,res)=>{
    res.render('login')

}
export const showSignUp= (req,res)=>{
    res.render('signup')

}
export const check=async(req,res)=>{
    
    const type = req.body.type
    const userName = req.body.username
    const password = req.body.password
    var response;
    if(type==="login"){
        if(userName.includes('@') && (userName.endsWith('.com') || userName.endsWith(".vn"))){

            response= await user.findOne({email:userName, password:password})
        }
        else{
            response= await user.findOne({userName:userName, password:password})
        }
        if(response){
            const code = nanoid()
            await user.updateOne(
                { id: response.id }, 
                { $set: { code: code } }
            );
            res.cookie('code',code,{ expires:new Date(Date.now()+900000),httpOnly:true,path :"/"})
            
            res.redirect('/')
     
            
    // Cookies that have been signed
    //   console.log('Signed Cookies: ', req.signedCookies)
        }
        else{
            var LoginError=''
            if(userName.includes('@') && (userName.endsWith('.com') || userName.endsWith(".vn"))){

                const re= await user.findOne({email:userName})
                if(!re){
                    LoginError="Email Đăng Nhập Không Tồn Tại"
                }
                else{
                    LoginError="Sai Mật Khẩu"
                }
            }
            else{
                const re1= await user.findOne({userName:userName})
                if(!re1){
                    LoginError="Tên Đăng Nhập Chưa Tồn Tại"
                }
                else{
                    LoginError="Sai Mật Khẩu"
                }
            }

            res.render('login', { LoginError: LoginError });
         
        }
}

    if(type==="signup"){
        const email= req.body.email
        const error =[]
            
            
          const  response1= await user.findOne({email:email})
           const response2= await user.findOne({userName:userName})
    
        if(response1){
            error[0]="Email Đã Tồn Tại"
        }
        if(response2){
            error[1]="Tên Tài Khoản Đã Tồn Tại"
        }
        if((response1===null||response1.length===0)&&(response2===null||response2.length===0)){
            const Count = await user.countDocuments({})
            const id='user'+(Count+1)
            const code =nanoid();
            res.cookie('code',code,{expires:new Date(Date.now()+900000),httpOnly:true,path:'/'})
        
            const NewUser = new user({id,typeAccount:'user', userName,password ,email, code:code})
        
            await NewUser.save()

            const NewCart = new cart({ userId:id,products:[]})
            await NewCart.save()
            res.redirect('/')
        }
        else{
            res.render('signup',{error:error})
        }

    }

}
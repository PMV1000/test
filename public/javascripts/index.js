

  // const ButtonCats = document.querySelectorAll("#button-cat")
    // ButtonCats.forEach(button=>{

    //     button.addEventListener('click',()=>{
    //         console.log("hi")
    //     })
    // })

    document.addEventListener("DOMContentLoaded",()=>{
      const buttonOpenFormEditCat =document.querySelectorAll(".buttonEdidCat")
      if(buttonOpenFormEditCat){
        buttonOpenFormEditCat.forEach(button=>{
          button.addEventListener("click",() => {
          if(button&& button.getAttribute("data-id")){
            console.log(`#formEditCat${button.getAttribute("data-id")}`)
           const formEditCat = document.querySelector(`#formEditCat${button.getAttribute("data-id")}`)
           if(formEditCat){
            formEditCat.classList.toggle("hidden")
            console.log("hide")
           }
          }
          })
        })
      }


      const HoverButtons = document.querySelectorAll(".hoverButton")
      if(HoverButtons){
        HoverButtons.forEach(button=>{


          button.addEventListener("mouseenter",()=>{
          if(button&& button.getAttribute("data-id")){
            const ListChild=document.querySelector(`#listChild${button.getAttribute("data-id")}`)
            if(ListChild&&ListChild.classList.contains("hidden")){
              ListChild.classList.remove("hidden")
            }

          } })


          button.addEventListener("mouseleave",()=>{
          if(button&& button.getAttribute("data-id")){
            const ListChild=document.querySelector(`#listChild${button.getAttribute("data-id")}`)
            if(ListChild&& (!ListChild.classList.contains("hidden"))){
              ListChild.classList.add("hidden")
            }

          } })



        })
      }


      const ButtonAddChilds = document.querySelectorAll(".showFormAddChild")
      if(ButtonAddChilds){
        ButtonAddChilds.forEach(button=>{

          if(button&&button.getAttribute("data-id")){
            button.addEventListener("click",()=>{
                const FormAddChild = document.querySelector(`#formAddChild${button.getAttribute("data-id")}`)
                if(FormAddChild){
                  FormAddChild.classList.toggle("hidden")
                }
            })
          }
        })
      }


     const buttonRemoveProInCarts = document.querySelectorAll('.class_btn_rm')
     if(buttonRemoveProInCarts){
      buttonRemoveProInCarts.forEach(button=>{
        if(button&&button.getAttribute('data-id')){
          button.addEventListener("click",()=>{
            console.log("Jh")

             const FormRM = document.querySelector(`#remove_mn${button.getAttribute('data-id')}`)
          if(FormRM){
            FormRM.classList.toggle("hidden")
            if(!FormRM.classList.contains("hidden")){
              FormRM.addEventListener("mouseleave",()=>{
                FormRM.classList.add("hidden")
            })}
          }
          })
         
        }
      })
     }


     const buttonCheckSelectedRs = document.querySelectorAll(".checkboxRight")
     if(buttonCheckSelectedRs){
      buttonCheckSelectedRs.forEach(button=>{
        if(button && button.getAttribute("data-id")){
          button.addEventListener("click",()=>{
           
              console.log(button.checked)
              const Nurl = new URL("/admin/setRight",window.location.origin)
              Nurl.searchParams.set("rightName",button.getAttribute("data-id"))
              Nurl.searchParams.set("rightValue",button.checked)
              window.location.href= Nurl
            
          })
        }
      })
     }




// Ở Đây Là Nơi Viết Hàm

     const UnSeLect = (button)=>{
            if(!button.classList.contains("hidden"))
             {button.classList.add("hidden")}

            if(!buttonUnTickAll.classList.contains("hidden")){
              console.log("ko còn chọn hết")  
              buttonTickAll.classList.remove("hidden")
              buttonUnTickAll.classList.add("hidden")
            }
            else{
              console.log("else")
            }

            if(IPRMMutiple){
              IPRMMutiple.value=IPRMMutiple.value.replace(button.getAttribute("data-id"),'')
              console.log(IPRMMutiple.value,"m")
            }

            
          
            const checkTick=Array.from(buttonUnSelectInCarts).every(button=>{
              console.log("vao, ",button.classList.contains("hidden"))
              return (button.classList.contains("hidden"))
            })
            if(checkTick&&buttonTickAll){
              buttonTickAll.classList.add("hidden")
        
            }
          
 
     }

     const SeLect =(B)=>{
      const Tick = document.querySelector(`#tick${B.getAttribute("data-id")}`)
      if(Tick){
      
        Tick.classList.remove("hidden")
      }
      if(RMMutiple){
        if(RMMutiple.classList.contains("hidden")){
          RMMutiple.classList.remove("hidden")
         
        }
        if(!IPRMMutiple.value.includes(B.getAttribute("data-id"))){
          IPRMMutiple.value=(`${IPRMMutiple.value},${B.getAttribute("data-id")}`)
        console.log(IPRMMutiple.value,"h")}
}
      if(buttonTickAll.classList.contains("hidden")){
        buttonTickAll.classList.remove("hidden")
      }
      
      
        const checkTick= Array.from(buttonUnSelectInCarts).every(button=>{
          return (!button.classList.contains("hidden"))
         })
         if(checkTick){
           console.log("nhấn hết")
           buttonTickAll.classList.add("hidden")
           buttonUnTickAll.classList.remove("hidden")
     
         }
       
     }



// Hàm riêng cho nút X thoát
const exit =(ButtonExitId,FormId,divContainId)=>{
  console.log("exit")
  const BTTexit = document.querySelector(ButtonExitId)
  const currentForm =  document.querySelector(FormId)
  if(BTTexit&&currentForm){
    BTTexit.addEventListener('click',()=>{
      const divContains =document.querySelector(divContainId) 
      const Inputs = Array.from(currentForm.querySelectorAll('input:not([type="hidden"])'));
      const Selec =Array.from(currentForm.querySelector('select'))
      if(Selec&&Selec.length!==0){
        Selec.forEach(input=>{
          input.value=''
        })
      }

      divContains.classList.add("hidden")
      Inputs.forEach(input=>{
        input.value=''
      })
    })
  }
  

}

   //trong đó PreId là chuỗi cố định (đứng trước biến) trong Id VD: `formcat${index}`

    
  const conFirm=(MainButtonID,ConfirmButtonID,PreId)=>
    {
        const ButtonRM = document.querySelectorAll(MainButtonID)
        const ButtonCofirmRM = document.querySelector(ConfirmButtonID)
        if(ButtonRM){
          ButtonRM.forEach(button=>{
            if(button&&button.getAttribute("data-id")){
              button.addEventListener("click",()=>{
                ButtonCofirmRM.setAttribute("data-id",button.getAttribute("data-id"))
              
    
              })
            }
          })
        }
    
        if(ButtonCofirmRM){
          ButtonCofirmRM.addEventListener("click",()=>{
            const FormRM = document.querySelector(`#${PreId}${ButtonCofirmRM.getAttribute("data-id")}`)
            console.log(FormRM)
            FormRM.submit()
          })
        } 
    }

   // Kết Thúc Phần Viết Hàm  

     const buttonTickAll= document.querySelector("#untick")
     const buttonUnTickAll= document.querySelector("#tick")
     const RMMutiple =document.querySelector("#rmmutiple")

     const IPRMMutiple =document.querySelector("#IPrmmutiple")

     const buttonUnSelectInCarts =document.querySelectorAll(".tick")
     if(buttonUnSelectInCarts){
      buttonUnSelectInCarts.forEach(button=>{
        if(button&&button.getAttribute("data-id")){
          button.addEventListener("click",()=>{
           UnSeLect(button)
            
          })
        }
      })
     }
    

     const buttonTick = document.querySelectorAll(".untick");
     if (buttonTick.length > 0) {
         console.log("Có phần tử với lớp .untick");
         buttonTick.forEach(B => {
             if(B&&B.getAttribute("data-id")){
              B.addEventListener("click",()=>{
               SeLect(B)
              })
             }
         });
     } else {
         console.log("Không có phần tử nào với lớp .untick");
     }
     
     

     const ButtonShowChildCatInClients= document.querySelectorAll(".button-cat")
     if(ButtonShowChildCatInClients){
      ButtonShowChildCatInClients.forEach(button=>{
        if(button&&button.getAttribute("data-id")){
          button.addEventListener("click",()=>{
            const DivChild = document.querySelector(`#catchilds${button.getAttribute("data-id")}`)
            if(DivChild){
            DivChild.classList.remove("hidden")

            DivChild.addEventListener("mouseleave",()=>{
              DivChild.classList.add("hidden")
            })}
        })


        }
      })
     }

     if(buttonTickAll){
      buttonTickAll.addEventListener("click",()=>{
          
          buttonTickAll.classList.add("hidden")
          buttonUnTickAll.classList.remove("hidden")
          
          buttonTick.forEach(B=>{
            if(B&&B.getAttribute("data-id")){
            SeLect(B)

              }

          })

      })

  }

  if(buttonUnTickAll){
      buttonUnTickAll.addEventListener("click",()=>{
          
           buttonUnTickAll.classList.add("hidden")
          
          buttonUnSelectInCarts.forEach(button=>{
            if(button&&button.getAttribute("data-id")){
              
               UnSeLect(button)
                
              
            }
          })
          
          RMMutiple.classList.add("hidden")
      })
      


  }



  const ButtonOpenFormEditpro = document.querySelectorAll('.buttonOpenFormEdit')
  if(ButtonOpenFormEditpro){
    ButtonOpenFormEditpro.forEach(button=>{
      if(button&&button.getAttribute("data-id")){
        
        button.addEventListener("click",()=>{
          console.log(`#FormEditProduct${button.getAttribute("data-id")}`)
          const Form = document.querySelector(`#FormEditProduct${button.getAttribute("data-id")}`)
          if(Form){
            Form.classList.toggle("hidden")
          }
      })

      }
    })
  }


  const ButtonRemoveImage = document.querySelectorAll('.removeImage')
  if(ButtonRemoveImage ){
    console.log("lấy được Buttonr r")
    ButtonRemoveImage .forEach(button=>{
      if(button&&button.getAttribute("data-id"))
        button.addEventListener("click",()=>{
          console.log("lấy click được Buttonr r",`#removeImg${button.getAttribute("data-id")}`)
          const Form =document.querySelector(`#removeImg${button.getAttribute("data-id")}`)
          console.log("lấy cl" ,Form)
          if(Form){
            
            Form.submit()
          }

        
        

      })
    })
  }

  const ButtonFilterDeleted = document.querySelector("#filterOFF")
  const ButtonFilteractive = document.querySelector("#filterON")
  
  if(ButtonFilterDeleted){
    ButtonFilterDeleted.addEventListener("click",()=>{
      const buttonActives =document.querySelectorAll('[data-status]')
      if(buttonActives){
        buttonActives.forEach(button=>{
          if(button&& button.getAttribute('data-id')&&button.getAttribute('data-status')&&button.getAttribute('data-status')===false){
            const TR = document.querySelector(`#tr${ button.getAttribute('data-id')}`)
            if(TR){
              console.log("tr",TR)
              TR.classList.add("hidden")
            }
          }
        })
      }
    })
  }


  if(ButtonFilteractive){
    ButtonFilteractive.addEventListener("click",()=>{
      const buttonUnActives =document.querySelectorAll('[data-status]')
      if(buttonUnActives){
        buttonUnActives.forEach(button=>{
          if(button&& button.getAttribute('data-id')&&button.getAttribute('data-status')&&button.getAttribute('data-status')===true){
            const TR = document.querySelector(`#tr${ button.getAttribute('data-id')}`)
            if(TR){
              TR.classList.add("hidden")
            }
          }
        })
      }
    })
  }


  //Gọi Các Hàm Confirm

  conFirm(".buttonRreMoveCat",'#confirmCat',"formReMCat")
  console.log("đã gọi hàm console.log")


//...


  //Gọi Hàm Exit
  exit("#ButtonOutPro","#FormAddProduct","#addProducts")
  console.log("đã gọi hàm console")

    })
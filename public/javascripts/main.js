// Đây dùng để xử lí sự kiện đơn lẻ không có tính hàng loạt


document.addEventListener('DOMContentLoaded',()=>{

    const BackButton = document.querySelector("#backButton")
    if(BackButton){
        BackButton.addEventListener("click",()=>{
            window.history.back()
        })
    }

    const menuBar = document.querySelector("#menu")
    const Sider = document.querySelector("#SIDER")
    if(menubar&&Sider){
    menuBar.addEventListener('click', ()=>{
        console.log("vô")
        Sider.classList.toggle("hidden")
    })}

  

    const buttonAddCat = document.querySelector('.addCategory')
    const formAddCat = document.querySelector('.formAddCat')
    if(buttonAddCat&&formAddCat){
    buttonAddCat.addEventListener('click',()=>{
        console.log("vo")
        formAddCat.classList.toggle('hidden')
    })
    }

    const buttonAddPro = document.querySelector('.button-addPro')
    const FormaddPro = document.querySelector('.addProducts')
    if(buttonAddPro&&FormaddPro){
    buttonAddPro.addEventListener('click',()=>{
        console.log("vo")
        FormaddPro.classList.toggle("hidden")
    })}

    const buttonShowUser = document.querySelector('.BTTsiderUser')
    const ShowUser = document.querySelector('#siderUser')
    if(buttonShowUser&&ShowUser){
    buttonShowUser.addEventListener("click",()=>{
        ShowUser.classList.toggle("hidden")
    })}


    const buttonShowInfo = document.querySelector('.showInfoUser')
    const Info = document.querySelector('#infoUser')
    if(buttonShowInfo&&Info){
    buttonShowInfo.addEventListener('click',()=>{
        Info.classList.toggle("hidden")
        Info.addEventListener("mouseleave",()=>{
            Info.classList.add("hidden") 
        })
    })}

    const buttonShowChangeInfo = document.querySelector('.showFormChangeInFo')
    const formChangeInfo = document.querySelector('#formChangeInfo')
    if(buttonShowChangeInfo&&formChangeInfo){
    buttonShowChangeInfo.addEventListener('click',()=>{
        formChangeInfo.classList.toggle("hidden")
    })}

    const buttonShowChangePass = document.querySelector('.showFormChangePass')
    const formChangePass = document.querySelector("#formChangePass")
    if(buttonShowChangePass&&formChangePass){
    buttonShowChangePass.addEventListener('click',()=>{
        formChangePass.classList.toggle("hidden")
    })}


   

    const ButtonShowFilter = document.querySelector(".buttonopenfiter")
    if(ButtonShowFilter){
        ButtonShowFilter.addEventListener("click",()=>{
            const Formfilter = document.querySelector("#filterPro")
            if(Formfilter){
                Formfilter.classList.toggle("hidden")
                Formfilter.addEventListener("mouseleave",()=>{
                    Formfilter.classList.add("hidden")
                })
            }
        })
    }

    const ExitForm = (idFrom,idInputs)=>{
        const Form = document.querySelector(`#${idFrom}`)
       
        if(idInputs&& Array.isArray(idInputs)){
        idInputs.forEach(inputID=>{
            const inp = document.querySelector(`#${inputID}`)
            if(inp){
                inp.value=''
            }
        })}
      if(From){
        Form.classList.add("hidden")
      }

    }


 const liPage = document.querySelectorAll(".linkpage")
 if(liPage){
    liPage.forEach(liP=>{
        const aPage=liP.querySelector('a')
        console.log(aPage&&aPage.innerText,"===",liP.getAttribute("data-page"),aPage&&aPage.innerText===liP.getAttribute("data-page"))
    if(aPage&&aPage.innerText===liP.getAttribute("data-page")){
        console.log("thỏa điều kiện")
        liP.classList.add("active")
    }
    })
 }


//  const aPage = document.querySelectorAll(".data-current-page")
//  if(aPage){
//     console.log(aPage)
//     aPage.forEach(alink=>{
//         if(alink){
//            const currentPage= alink.parentElement.getAttribute("data-page")
//            console.log(currentPage,"P")
//            if(currentPage&&liPage){
//             console.log("A",alink)
//             alink.addEventListener("click",()=>{
               
//                liPage.forEach(liP=>{
//                 if(liP){

//                 const temp=parseInt(liP.querySelector('a').innerText,10)-1
//                 const linkk =liP.querySelector('a').href.replace(`/page/${parseInt(liP.innerText,10)}`,`/page/${parseInt(liP.innerText,10)-1}`)
//                 liP.querySelector('a').innerText=temp
//                 liP.querySelector('a').href=linkk
//                 console.log("nhn",linkk)
//             }
//             })
             
//             })
//            }
//         }
//     })
//  }



})
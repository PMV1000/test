document.addEventListener("DOMContentLoaded",()=>{
    const btA= document.getElementById("addCat")
    const FA= document.getElementById("formAddCat")
    btA.addEventListener('click',()=>{
        console.log("h")
        FA.classList.toggle('hidden')
    })

})


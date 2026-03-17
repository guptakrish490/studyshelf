const addNewBtn=document.getElementById("addnew");
const formContainer=document.getElementById("formContainer");
const overlay=document.getElementById("overlay");

addNewBtn.addEventListener("click",()=>{

    if(formContainer.style.display==="none"){
        formContainer.style.display="flex";
        overlay.style.display="flex";
        addNewBtn.style.transform="rotateZ(45deg) scaleX(1.1) scaleY(1.1)"
    }
    else{
        formContainer.style.display="none";
        addNewBtn.style.transform="rotateZ(180deg)";
        overlay.style.display="none";
    }

})

document.getElementById("cancelSave").addEventListener("click",()=>{
    formContainer.style.display="none";
    overlay.style.display="none";
    addNewBtn.style.transform="rotateZ(180deg)";
})

document.getElementById("addResources").addEventListener("click",()=>{

    if(formContainer.style.display==="none"){
        formContainer.style.display="flex";
        overlay.style.display="flex";
    }
    else{
        formContainer.style.display="none";
        overlay.style.display="none";
    }
})
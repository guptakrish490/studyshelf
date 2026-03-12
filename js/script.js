const formContainer=document.getElementsByTagName("form")[0];
const addnew=document.getElementById("addnew");
const overlay=document.getElementById("overlay");
const addResources=document.getElementById("addResources");
const cancelSave=document.getElementById("cancelSave");
const saveButton=document.getElementById("saveButton");
const subjectInput=document.getElementById("subjectInput");
const container=document.getElementById("container");

addnew.addEventListener("click",()=>{
    if(formContainer.style.display==="none"){
        formContainer.style.display="flex";
        addnew.style.transform="rotateZ(45deg) scaleX(1.1) scaleY(1.1)";
        overlay.style.display="flex"
    }
    else{
        formContainer.style.display="none";
        addnew.style.transform="rotateZ(270deg)";
        overlay.style.display="none";
    
    }
    addnew.style.transitionDuration="0.5s";
})

addResources.addEventListener("click",()=>{
    if(formContainer.style.display==="none"){
        formContainer.style.display="flex";
        overlay.style.display="flex";
    }
    else{
        formContainer.style.display="none";
    
    }
})

cancelSave.addEventListener("click",(e)=>{
    e.preventDefault();
    formContainer.style.display="none";
    overlay.style.display="none";
    addnew.style.transform="rotateZ(270deg)";
    formContainer.reset();
    
})


saveButton.addEventListener("click",()=>{
    // e.preventDefault();
    const newCard=document.createElement("div");
    newCard.className="card";
    addResources.style.display="none";
    document.getElementsByName('midText')[0].style.display="none";
    container.style.display = "flex";
    container.style.justifyContent = "flex-start";

    let title=document.getElementById("title").value;
    let link=document.getElementById("link").value;
    let selectDropdown=document.getElementById("selectDropdown").value;
    let subjectInputValue=document.getElementById("subjectInput");

    newCard.innerHTML=`<div class="topPart">
                            <p>${subjectInputValue}</p>
                        </div>
                        <div class="midPart">
                            <div class="subCategory">
                                <p>${selectDropdown}:</p>
                                <div class="details">
                                    <p>${title}</p>
                                    <a>${link}</a>
                                    <img id="pencilEdit" src="/studyshelf/studyshelf/assets/pencilEdit.svg">
                                    <img id="removeCategory" src="/studyshelf/studyshelf/assets/removeBin.svg">
                                </div> 
                            </div>
                            
                        </div>
                        <div class="bottomPart">
                            <div class="bottomLeft">
                                <button id="addAnotherResourcesButton">+ Add Another resources</button>
                            </div>
                            <div class="bottomRight">
                                <button id="cardCancelButton">Cancel</button>
                                <button id="cardSaveButton">Save Subject</button>
                            </div>
                        </div>`

    container.append(newCard);
    formContainer.style.display="none";
    formContainer.reset();
    overlay.style.display="none";
})



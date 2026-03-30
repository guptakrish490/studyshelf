//for new subject form
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
        formContainer.reset();
        formContainer.style.display="none";
        addNewBtn.style.transform="rotateZ(180deg)";
        overlay.style.display="none";
    }
    overlay.addEventListener("click",()=>{
        overlay.style.display="none";
        formContainer.style.display="none";
        addNewBtn.style.transform="rotateZ(180deg)";
    })

})

document.getElementById("cancelSave").addEventListener("click",()=>{
    formContainer.style.display="none";
    overlay.style.display="none";
    addNewBtn.style.transform="rotateZ(180deg)";
    formContainer.reset();
})


document.getElementById("formContainer").addEventListener("click",(e)=>e.stopPropagation());
document.getElementById("formContainer").addEventListener("submit", () => {

    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    
    const subjectName = document.getElementById("subject").value;
    const categoryName = document.getElementById("selectDropdown").value || null;
    const titleName = document.getElementById("title").value || null;
    const driveLink = document.getElementById("link").value || null;
    
    console.log("saved:", subjects);
    const existingSubject = subjects.find(s => s.name.toLowerCase() === subjectName.toLowerCase());
    
    if (existingSubject) {
       alert(`Subject with name "${existingSubject.name}" already exists!\nPlease add more Categories if needed!`);
    } 
    
    else {
        const subject = {
            name: subjectName,
            categories: [
                {
                    name: categoryName,
                    items: [
                        {
                            title: titleName,
                            link: driveLink
                        }
                    ]
                }
            ]
        };
        
        subjects.push(subject);
        localStorage.setItem("subjects", JSON.stringify(subjects));
        location.reload();
        
        renderCards();
    }
});
///////////



// for edit subject
document.getElementById("editSubject").addEventListener("click",(e)=>e.stopPropagation());

document.addEventListener("click",(e)=>{
    
    
    if(e.target.classList.contains("editSubjectImg")){
        e.stopPropagation();
        const form=document.getElementById("editSubject");
        const overlay=document.getElementById("overlay");
        const subjectName=e.target.closest(".card").getAttribute("data-subject");
        

        form.dataset.currentSubject=subjectName;

        if(form.style.display==="none"){
            overlay.style.display="flex";
            form.style.display="flex";
            form.querySelector(".newSubjectName").value=subjectName;
        }
        e.target.closest(".card").scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
        overlay.addEventListener("click",()=>{
            overlay.style.display="none";
            form.style.display="none";
            form.reset();
        })
        document.getElementById("addnew").addEventListener("click",()=>{
            form.style.display="none";
        })
        

    }

})

document.getElementById("editSubject").addEventListener("submit",()=>{
    
    const subjects=JSON.parse(localStorage.getItem("subjects"))||[];

    const subjectName=document.getElementById("editSubject").getAttribute("data-current-subject");
    const subject=subjects.find(s=> s.name===subjectName);

    const form=document.getElementById("editSubject");
    const newSubjectName=form.querySelector(".newSubjectName").value;

    if(confirm(`Are you sure to change name from '${subjectName}' to '${newSubjectName}'?`)){
        subject.name=newSubjectName;
        localStorage.setItem("subjects",JSON.stringify(subjects));

        overlay.style.display="none";
        form.style.display="none";
        renderCards();
    }
    const updatedCard = document.querySelector(`.card[data-subject="${newSubjectName}"]`);
    expandCard(updatedCard);

})
///////////


//for edit category
document.getElementById("editCategory").addEventListener("click",(e)=>e.stopPropagation());
document.addEventListener("click",(e)=>{
    
    if(e.target.classList.contains("editSubjectCategory")){
        e.stopPropagation();

        const editForm=document.getElementById("editCategory");
        const categoryCard=e.target.closest(".cardHero");
        const subjectName=e.target.closest(".card").getAttribute("data-subject");
        const categoryName=categoryCard.getAttribute("data-category");

        editForm.dataset.currentCategory=categoryName;
        editForm.dataset.currentSubject=subjectName;

        if(editForm.style.display==="none"){
            overlay.style.display="flex";
            editForm.style.display="flex";
            editForm.querySelector(".newCategoryName").value=categoryName;
        }
        e.target.closest(".categoryMain").scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
        overlay.addEventListener("click",()=>{
            overlay.style.display="none";
            editForm.style.display="none";
            editForm.reset();
        })
        document.getElementById("addnew").addEventListener("click",()=>{
            editForm.style.display="none";
        })

    }
})

document.getElementById("editCategory").addEventListener("submit",()=>{
    
    const subjects=JSON.parse(localStorage.getItem("subjects"))||[];

    const editForm=document.getElementById("editCategory");
    const subjectName=editForm.getAttribute("data-current-subject");
    const categoryName=editForm.getAttribute("data-current-category");

    const subject=subjects.find(s=>s.name===subjectName);
    const category=subject.categories.find(c=>c.name===categoryName);
    
    let newCategoryName=editForm.querySelector("#selectCategoryNew").value;
    if((newCategoryName==="Select a Category"))newCategoryName=editForm.querySelector(".newCategoryName").value;
    if((newCategoryName!=="Select a Category") && confirm(`Are you sure to change name from "${categoryName}" to "${newCategoryName}"?`)){
        category.name=newCategoryName;
        localStorage.setItem("subjects",JSON.stringify(subjects));

        overlay.style.display="none";
        editForm.style.display="none";
        renderCards();
    }

    const updatedCard = document.querySelector(`.card[data-subject="${subjectName}"]`);
    expandCard(updatedCard);
    

})
////////////
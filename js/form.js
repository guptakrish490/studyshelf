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


document.getElementById("formContainer").addEventListener("submit", (e) => {
    // e.preventDefault();

    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    
    const subjectName = document.getElementById("subject").value;
    const categoryName = document.getElementById("selectDropdown").value;
    const titleName = document.getElementById("title").value;
    const driveLink = document.getElementById("link").value;
    
    console.log("saved:", subjects);
    let existingSubject = subjects.find(s => s.name === subjectName);
    
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
        console.log("saved:", subjects);
        location.reload();
        
        renderCards();
    }
});
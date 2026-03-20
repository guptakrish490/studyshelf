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


// document.getElementById("formContainer").addEventListener("submit",(e)=>{
//     e.preventDefault();
//     localStorage.setItem("name","krish");
    // const subjectName=document.getElementById("subject").value;
    // const categoryName=document.getElementById("selectDropdown").value;
    // const titleName=document.getElementById("title").value;
    // const driveLink=document.getElementById("link").value;
    // const subject={name:subjectName,
    //                     categories:[
    //                     {
    //                         name:categoryName,
    //                         items:[
    //                             {
    //                                 title:titleName,
    //                                 link:driveLink
    //                             }
    //                         ]
    //                     }    
    //                 ]
    //             }
    
    //     subjects.push(subject);
    //     localStorage.setItem("subjects",JSON.stringify(subjects));
//     console.log("saved");
// })

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

document.getElementById("formContainer").addEventListener("submit", (e) => {
    // e.preventDefault();

    const subjectName = document.getElementById("subject").value;
    const categoryName = document.getElementById("selectDropdown").value;
    const titleName = document.getElementById("title").value;
    const driveLink = document.getElementById("link").value;

    let existingSubject = subjects.find(s => s.name === subjectName);

    if (existingSubject) {
        // Check if category already exists
        let existingCategory = existingSubject.categories.find(c => c.name === categoryName);

        if (existingCategory) {
            // Add new item to existing category
            existingCategory.items.push({ title: titleName, link: driveLink });
        } else {
            // Add new category with first item
            existingSubject.categories.push({
                name: categoryName,
                items: [{ title: titleName, link: driveLink }]
            });
        }
    } else {
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
        localStorage.setItem("subjects", JSON.stringify(subjects)); // ✅ save array, not single subject
        console.log("saved:", subjects);
    }
});
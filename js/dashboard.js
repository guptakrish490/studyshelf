const cards=JSON.parse(localStorage.getItem("subjects"))|| [];

//render cards on page reload
document.addEventListener("DOMContentLoaded",()=>{
    renderCards();
})
if(cards.length===0){
    document.getElementById("cardContainer").innerHTML=`<p>No Resources to Display...</p>
                            <button id="addResources">+ Add Resources</button>`;
    
}
////////////


// for rendering new cards using input form
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
function renderCards(){

    const cards=JSON.parse(localStorage.getItem("subjects"))||[];
    const cardContainer=document.getElementById("cardContainer");

    if(cards.length!==0){
    cardContainer.innerHTML="";

    cards.forEach(sub => {

        if(sub.name){

        const newCard=document.createElement("div");
            newCard.classList.add("card");
            newCard.dataset.subject=`${sub.name}`;
            let html=`<div class="cardMain">
                        <img src="assets/scrollDown.svg" class="expandCard">&nbsp
                        <h3>${sub.name}</h3>
                        <div class="extraOptions">
                            <img class="addSubjectImg" src="assets/addNewCategoryBtn.svg" alt="edit">
                            <img class="editSubjectImg" src="assets/pencilEdit.svg" alt="edit">
                            <img class="deleteSubjectImg" src="assets/removeBin.svg" alt="remove">
                        </div>
                    </div>`;
                    
                    
                sub.categories.forEach(cat=>{
                    
                    if(cat.name){
                    html+=`<div class="cardHero" data-category="${cat.name}" style="display:none;">
                                <div class="categoryMain">
                                    <h4>${cat.name}</h4>
                                    <button class="addMoreLinks"><img class="addMoreFiles" src="assets/addNewCategoryBtn.svg" alt="add"></button>
                                    <button class="editCategory"><img class="editSubjectCategory" src="assets/pencilEdit.svg" alt="edit"></button>
                                    <button class="deleteCategory"><img class="deleteSubjectCategory" src="assets/removeBin.svg" alt="delete"></button>
                                </div>
                                `;


                    cat.items.forEach(item=>{

                        if(item.title && item.link){

                            html+=` <div class="item">
                                        •<a href="${item.link}" target="_blank">${item.title}</a>
                                        <img src="assets/removeBin.svg" class="deleteFiles">
                                    </div>`;

                        }

                    })
                    html+=`</div>`;
                    html+=`<form class="addMoreFilesForm" data-formCategory="${cat.name}" style="display:none">
                                <div class="inputs">
                                    <span>Enter Title:&nbsp </span><input type="text" class="addNewTitle" placeholder="Enter title">
                                </div>
                                <div class="inputs"> 
                                    <span>Enter #driveLink:&nbsp </span><input type="text" class="addNewLink" placeholder="Enter driveLink">
                                </div>

                                <button class="saveAddedFiles">Save</button>
                            </form>`

                    
                    html+=` <div class="miniCard">
                                <span class="miniNames">• ${cat.name}</span>  
                            </div>`;

                }

                });
                html+=`     <form class="addMoreCategory" style="display:none">
                                <span>Add a new Category:&nbsp </span>
                                <select id="newCategory" class="newCategory">
                                    <option selected disabled value="Select a Category">Select a Category</option aria-required>
                                    <option value="Class Notes">Class Notes</option>
                                    <option value="Assignments">Assignments</option>
                                    <option value="PYQs">PYQs</option>
                                    <option value="Practice Papers">Practice Papers</option>
                                    <option value="Projects">Projects</option>
                                    <option value="Others">Others</option>
                                </select>
                                <button class=saveAddMoreCategory>Save</button>
                        </form>`;

            newCard.innerHTML=html;
            cardContainer.appendChild(newCard);

            }
    });
}
}
/////////////



// for adding more category to a card
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("addSubjectImg")){
        const parentDiv = e.target.parentElement.parentElement.parentElement;
        const categoryForm = parentDiv.querySelector(".addMoreCategory");
 

        if(categoryForm.style.display!=="none") categoryForm.style.display="none";
        else if(categoryForm.style.display==="none"){
            categoryForm.style.display="flex";

            categoryForm.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        }
    }
})
document.addEventListener("submit",(e)=>{
    e.preventDefault();
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    const currentCard = e.target.parentElement;

    const currentSubjectName=currentCard.getAttribute("data-subject")
    const existingSubject=subjects.find(s => s.name === currentSubjectName);
    
    if(e.target.classList.contains("addMoreCategory")){
        
        const categoryForm =e.target;
        
        const textInput = categoryForm.querySelector(".newCategory").value;
        const existingCategory=existingSubject.categories.find(c => c.name===textInput);
        
        if(!existingCategory && textInput!=="Select a Category"){
            existingSubject.categories.push({
                                                name: textInput,
                                                items: []
                                            })
        }else if(existingCategory && textInput!=="Select a Category"){
            alert(`'${textInput}' category already exist in "${currentSubjectName}"!`);
        }else if(textInput==="Select a Category"){
            alert(`Please select a Category to add!`);
        }
        localStorage.setItem("subjects", JSON.stringify(subjects));
        
        categoryForm.style.display="none";

        currentCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    
        renderCards();
        const updatedCard = document.querySelector(`.card[data-subject="${currentSubjectName}"]`);
        expandCard(updatedCard);

        


    }
})
////////////



//delete a subject from localstorage and remove it's card
document.addEventListener("click",(e)=>{

    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    if(e.target.classList.contains("deleteSubjectImg")){
        const card=e.target.parentElement.parentElement.parentElement;
        const subjectName=card.getAttribute("data-subject");
        console.log(subjectName);

        
        if(confirm(`Are you sure to delete ${subjectName}?`)){
            const updatedSubjects = subjects.filter(s => s.name !== subjectName);
            localStorage.setItem("subjects", JSON.stringify(updatedSubjects));

            window.scrollTo({
                top:0,
                behavior: "smooth"
            });
        }

        renderCards();
        const updatedCard = document.querySelector(`.card[data-subject="${subjectName}"]`);
        expandCard(updatedCard);


    }
})


// add more files(drive links) to card
document.addEventListener("click",(e)=>{

    
    if(e.target.classList.contains("addMoreFiles")){
        const category=e.target.parentElement.parentElement.parentElement;
        const categoryName=category.getAttribute("data-category");

        const card=e.target.parentElement.parentElement.parentElement.parentElement;
        const inputForm = Array.from(card.querySelectorAll(".addMoreFilesForm")).find(i => i.getAttribute("data-formCategory")===categoryName);

        if(inputForm.style.display!=="none"){
            inputForm.style.display="none";
            category.parentElement.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }

        else {
            inputForm.style.display="flex";
            inputForm.scrollIntoView({
                behavior: "smooth",
                block:"center"
            })
        }


    }
});
document.addEventListener("submit",(e)=>{
    e.preventDefault();

    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    if(e.target.classList.contains("addMoreFilesForm")){
        
        const card=e.target.closest(".card");
        const inputForm=e.target;

        const titleName=inputForm.querySelector(".addNewTitle").value;
        const driveLink=inputForm.querySelector(".addNewLink").value;

        const subject=e.target.parentElement;
        
        const subjectName=subject.getAttribute("data-subject");
        const categoryName=inputForm.getAttribute("data-formCategory");

        if(titleName!=="" && driveLink!==""){
        
            const existingSubject=subjects.find(s=>s.name===subjectName);
            const existingCategory=existingSubject.categories.find(c=>c.name===categoryName);
            
            existingCategory.items.push({
                                            title: titleName,
                                            link: driveLink
                                        });

            localStorage.setItem("subjects", JSON.stringify(subjects));

        }else{
            alert("Please fill all the details to continue!!!")
        }

        if(inputForm.style.display!=="none"){
            inputForm.style.display="none"

            card.parentElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        
        else {
            inputForm.style.display="flex";
        }
        renderCards();
        const updatedCard = document.querySelector(`.card[data-subject="${subjectName}"]`);
        expandCard(updatedCard);
        
    }
})
/////////////


//delete selected category from card
document.addEventListener("click",(e)=>{

    const subjects=JSON.parse(localStorage.getItem("subjects"))||[];

    if(e.target.classList.contains("deleteSubjectCategory")){

        const categoryBox=e.target.parentElement.parentElement.parentElement;
        const card=categoryBox.parentElement;

        const subjectName=card.getAttribute("data-subject");
        const categoryName=categoryBox.getAttribute("data-category")

        if(confirm(`Are you sure to delete '${categoryName}' from '${subjectName}' `)){
        
            const existingSubject=subjects.find(s=>s.name===subjectName);
            const updatedCategory=existingSubject.categories.filter(c=>c.name!==categoryName);

            existingSubject.categories=updatedCategory;
            
            
            
            localStorage.setItem("subjects",JSON.stringify(subjects));
        }
        
        renderCards();
        const updatedCard = document.querySelector(`.card[data-subject="${subjectName}"]`);
        expandCard(updatedCard);

    }
})
////////////

//delete selected file from category
document.addEventListener("click",(e)=>{
    e.stopPropagation();
    const subjects=JSON.parse(localStorage.getItem("subjects"))||[];

    if(e.target.classList.contains("deleteFiles")){
        const card=e.target.closest(".card");
        const subjectName=card.getAttribute("data-subject");
        const categoryName=e.target.closest(".cardHero").getAttribute("data-category");
        const fileName=e.target.closest(".item").querySelector("a").textContent;
        
        const subject=subjects.find(s=>s.name===subjectName);
        const category=subject.categories.find(c=>c.name===categoryName);

        const updatedFiles=category.items.filter(f=>f.title!==fileName);

        if(confirm(`Are you sure to delete the '${fileName}'?`)){
            category.items=updatedFiles;
            localStorage.setItem("subjects",JSON.stringify(subjects));
        }
        renderCards();
        const updatedCard = document.querySelector(`.card[data-subject="${subjectName}"]`);
        expandCard(updatedCard);
    }
})
////////////



//expand cards by click
function expandCard(card){

    card.querySelector(".expandCard").style.transform="rotateX(180deg)";

    const cardHero=card.querySelectorAll(".cardHero");
    cardHero.forEach(c=>{
        c.style.display="flex";
    })

    const miniCard=card.querySelectorAll(".miniCard");
    miniCard.forEach(m=>{
        m.style.display="none";
    })
}
document.addEventListener("click",(e)=>{
    e.stopPropagation();

    if(e.target.classList.contains("expandCard") || e.target.classList.contains("miniCard")){
        const card=e.target.closest(".card");
        const cardHero=card.querySelectorAll(".cardHero");

        cardHero.forEach(c=>{

            if(c.style.display!=="none"){
                c.style.display="none";
                card.querySelector(".expandCard").style.transform="rotateZ(0deg)"
            }
            else{
                c.style.display="flex";
                card.querySelector(".expandCard").style.transform="rotateZ(180deg)"
            }
            
        })


        const miniCard=card.querySelectorAll(".miniCard");

        miniCard.forEach(m=>{

            if(m.style.display!=="none")m.style.display="none";
            else m.style.display="flex";

        })
    }
})
////////////
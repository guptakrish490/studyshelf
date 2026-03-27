const cards=JSON.parse(localStorage.getItem("subjects"))|| [];

//render cards on page reload
document.addEventListener("DOMContentLoaded", function() {
    renderCards(); 
});
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

        const newCard=document.createElement("div");
            newCard.classList.add("card");
            newCard.dataset.subject=`${sub.name}`;
            let html=`<div class="cardMain">
                        <h3>${sub.name}</h3>
                        <div class="extraOptions">
                            <img class="editSubjectImg" src="assets/addNewCategoryBtn.svg" alt="edit">
                            <img class="deleteSubjectImg" src="assets/removeBin.svg" alt="remove">
                        </div>
                    </div>`;
                    
                    
                sub.categories.forEach(cat=>{
                    html+=`<div class="cardHero">
                                <div class="categoryMain">
                                    <h4>${cat.name}</h4>
                                    <button class="addMoreLinks"><img src="assets/addNewCategoryBtn.svg" alt="add"></button>
                                    <button class="deleteCategory"><img src="assets/removeBin.svg" alt="delete"></button>
                                </div>
                                `;


                    cat.items.forEach(item=>{
                        html+=`     <div class="item">
                                        <a href="${item.link}" target="_blank">${item.title}</a>
                                    </div>
                                `;

                    })
                    html+=`</div>`;
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
    });
}

}
/////////////



// for adding more category to a card
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("editSubjectImg")){
        const parentDiv = e.target.parentElement.parentElement.parentElement;
        const categoryForm = parentDiv.querySelector(".addMoreCategory");
 

        if(categoryForm.style.display!=="none") categoryForm.style.display="none";
        else if(categoryForm.style.display==="none"){
            categoryForm.style.display="flex";

            categoryForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
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

        currentCard.querySelector(".cardHero").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    
        renderCards();

        


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


    }
})
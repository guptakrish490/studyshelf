const cards=JSON.parse(localStorage.getItem("subjects"))|| [];

if(cards.length==0){
    document.getElementById("cardContainer").innerHTML=`<p>No Resources to Display...</p>
                            <button id="addResources">+ Add Resources</button>`
}

function renderCards(){
    
}

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
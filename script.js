//function to convert any rgb value to hex code.
function rgbToHex(rgb) {
    // Extract the r, g, b values using a regular expression
    let result = rgb.match(/\d+/g);
    let r = parseInt(result[0]).toString(16).padStart(2, '0');
    let g = parseInt(result[1]).toString(16).padStart(2, '0');
    let b = parseInt(result[2]).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}

//function to display the available colors when adding a new list type.
function displayColors(availableColors){
    availableColors.forEach((color)=>{
        const colorDiv=document.createElement('div');
        colorDiv.className="available-colors";
        colorDiv.style.backgroundColor=`${color}`;
        listColors.appendChild(colorDiv);
    })
    addListColor.style.backgroundColor=availableColors[0];
}

//Function to check if the name already exists in the list.
function checkList(name,color){
    let exists=false;
    for (let i=0;i<listTypes.length;i++){
        if (listTypes[i].listName==name){
            exists=true;
            break;
        }
    }
    if (!exists){
        updateListType(name,color);
    }else{
        alert("The list already exists");
    }
}

//Function to update the new list type in the existing list.
function updateListType(listName,listColor){
    listTypes.push({
        listName:listName,
        color:listColor
    })
    const listType=document.getElementById("list-type");

    const list=document.createElement('li');

    const anchor=document.createElement('a');
    anchor.href="#";

    const spanColor=document.createElement('span');
    spanColor.className="list-icon";
    spanColor.style.backgroundColor=`${listColor}`;

    const p=document.createElement('p');
    p.textContent=listName;

    const spanNumber=document.createElement('span');
    spanNumber.id=`${listName}-number`;
    spanNumber.className="updating-number";

    anchor.appendChild(spanColor);
    anchor.appendChild(p);
    anchor.appendChild(spanNumber);

    list.appendChild(anchor);

    listType.appendChild(list);

    availableColors=availableColors.filter((color)=>color.toLowerCase()!==listColor);
    removeColor(listColor);
    const option=document.createElement('option');
    option.textContent=listName;
    option.value=listName;
    selectType.appendChild(option);

    
}

//function to remove used color from available colors.
function removeColor(listColor){
    const children=listColors.children;
    const childrenArray=Array.from(children);
    childrenArray.forEach(child=>{
        const hexColor=rgbToHex(window.getComputedStyle(child).backgroundColor);
        if (hexColor===listColor){
            listColors.removeChild(child);
        }
    });
    addListColor.style.backgroundColor=availableColors[0];
}

const listColors=document.querySelector(".list-colors");
let availableColors=["#DA77F2","#9775FA","#5C7CFA","#8CE99A","#FFD43B","#FF922B"];
const listTypesColors=["#FF6B6B","#DA77F2","#9775FA","#5C7CFA","#66D9E8","#8CE99A","#FFD43B","#FF922B"];

const colors=Object.freeze({
    RED:"#FF6B6B",
    MAGENTA:"#DA77F2",
    VIOLET:"#9775FA",
    BLUE:"#5C7CFA",
    CYAN:"#66D9E8",
    GREEN:"#8CE99A",
    YELLOW:"#FFD43B",
    ORANGE:"#FF922B"
});

const listTypes=[
    {
        listName:"personal",
        color:"RED",
        count:0,
    },
    {
      listName:"work",
      color:"CYAN",
      count:0,  
    }
];






const addListColor=document.getElementById("input-section__color");
displayColors(availableColors);

const addListBtn=document.getElementById("add-list");
const addListSection=document.querySelector(".add-list__section");

addListBtn.addEventListener('click',()=>{
    addListSection.classList.toggle("open");
})



//Select colors from the add list
const selectedColor=document.querySelectorAll(".available-colors");
selectedColor.forEach((box)=>{
    box.addEventListener('click',()=>{
        addListColor.style.backgroundColor=window.getComputedStyle(box).backgroundColor;;
    })
})

//Adding new type of list.
const listInput=document.getElementById("list-input");
listInput.addEventListener('keydown',(event)=>{
    if (event.key==="Enter"){
        const listName=listInput.value.trim();
        if (listName===""){
            alert("Cannot add empty list");
        }else{
            const listColor=rgbToHex(window.getComputedStyle(addListColor).backgroundColor);
            checkList(listName,listColor);
            listInput.value="";
        }
    }
})

//Opening and closing the nav bar.
const navBar=document.querySelector(".nav");
const menuBtn=document.getElementById("menu-btn");
menuBtn.addEventListener('click',()=>{
    navBar.classList.toggle("hide");
    if (addListSection.classList.contains('open')){
        addListSection.classList.remove('open');
    }
})

//Clicking add task 
const btnId=document.getElementById("btnId");
const addTask=document.querySelector(".add-task");
const addTaskBtn=document.querySelectorAll(".add-task__btn");
addTaskBtn.forEach(btn=>{
    btn.addEventListener("click",(event)=>{
        addTask.classList.add("open");
        checkDate(event.target.id);
        
        //Giving a hidden input field a value to store the source through which form is opened. This is later used to select containers to add task.
        btnId.value=event.target.id;
    })
})

//Closing the add task section
const closeBtn=document.querySelector(".close");
closeBtn.btn.addEventListener("click",()=>{
            document.querySelector(".error").classList.remove('open');
            if (document.getElementById("title").value!==""){
                alert("Are you sure ?");
            }
            else{
                resetForm();
                closeBtn.closest('.add-form__container').classList.remove('open');
            }
})

const selectType=document.getElementById("type");
function displayListTypes(){
    listTypes.forEach(obj=>{
        const listOption=document.createElement('option');
        listOption.textContent=obj.listName;
        listOption.value=obj.listName;
        selectType.appendChild(listOption);
    })
}

function checkDate(id){
    const selectDate=document.getElementById("due-date");
    setDate(selectDate,id); 
}

function setDate(select,id){
    select.disabled=false;
    select.value='';
    const today=new Date();
    if (id==="today-task__btn"){
        select.value=today.toISOString().split('T')[0];
        select.disabled=true;
    }
    else if(id==="tomorrow-task__btn"){
        const tomorrow=new Date(today);
        tomorrow.setDate(today.getDate()+1);
        select.disabled=true;
        select.value=tomorrow.toISOString().split('T')[0];
    }
    else if(id==="week-task__btn"){
        const minimumDate=new Date(today);
        minimumDate.setDate(today.getDate()+2);
        const maximumDate=new Date(today);
        maximumDate.setDate(today.getDate()+7);
        select.min=minimumDate.toISOString().split('T')[0];
        select.max=maximumDate.toISOString().split('T')[0];
    }
}

function resetForm(){
    const form=document.getElementById("add-form");
    form.reset();
    const select=document.getElementById('due-date');
    select.removeAttribute('min');
    select.removeAttribute('max');
}

const form=document.getElementById("add-form");
form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const title=document.getElementById("title").value;
    const dueDate=document.getElementById("due-date").value;
    const error=document.querySelector(".error");
    if (title===""){
        error.classList.add("open");
    }
    else{
        const description=document.getElementById("description").value;
        const type=document.getElementById("type").value;
        const priority=document.getElementById("priority").value;   
        const btn=document.getElementById('btnId').value;
        addTaskToScreen(title,btn,dueDate);
        form.reset();
        addTask.classList.remove('open');
        error.classList.remove('open');
    }   
})

const containerMap={
    "today-task__btn":["today-tasks","today-number"],
    "tomorrow-task__btn":["tomorrow-tasks","upcoming-number"],
    "week-task__btn":["week-tasks","upcoming-number"],
    "personal-task__btn":["personal-tasks","personal-number"],
    "work-task__btn":["work-tasks","work-number"]
}


function addTaskToScreen(title,id,date){
    let container;
    if (id===Object.keys(containerMap)[0]){
        container=document.querySelectorAll(`.${containerMap[id][0]}`);
    }else if(id===Object.keys(containerMap)[1] || id===Object.keys(containerMap)[2]){
        container=[document.getElementById(containerMap[id][0])];
    }else{
        container=selectContainers(id,date);
    }
    
    //Creating required elements and adding the attributes.
    const div=document.createElement('div');
    div.className="task";

    const checkbox=document.createElement('input');
    checkbox.type="checkbox";

    const titleParagraph=document.createElement('p');
    titleParagraph.textContent=title;

    const moreIcon=document.createElement('img');
    moreIcon.src="assets/icons/more.svg";

    //Appening all the elements to the div.
    div.appendChild(checkbox);
    div.appendChild(titleParagraph);
    div.appendChild(moreIcon);

    //Adding the final div to the required containers.
    if (container.length===1){
        container[0].appendChild(div);
    }else{
        const clonedDiv=div.cloneNode(true);
        container[0].appendChild(div);
        container[1].appendChild(clonedDiv);
    }
    updateNumber(id);
}

const updateNumber=(id)=>{
    if (id==="today-task__btn"){
        updateTodayNumber();
        updateUpcomingNumber();
    }else{
        updateUpcomingNumber();
    }
}

const selectContainers=(id,date)=>{
    const containers=[document.getElementById(containerMap[id][0])];
    const today=new Date();  
    if (date===today.toISOString().split('T')[0]){
        const extraContainer=document.getElementById(containerMap["today-task__btn"][0]);
        containers.push(extraContainer);    
    }else{
        const tomorrow=new Date(today);
        tomorrow.setDate(today.getDate()+1);
        if((date===tomorrow.toISOString().split('T')[0])){
            const extraContainer=document.getElementById(containerMap["tomorrow-task__btn"][0]);
            containers.push(extraContainer);
        }else{
            const minimumDate=new Date(today);
            minimumDate.setDate(today.getDate()+2);
            const maximumDate=new Date(today);
            maximumDate.setDate(today.getDate()+7);
            if (date>=minimumDate.toISOString().split('T')[0] && date<=maximumDate.toISOString().split('T')[0]){
                console.log("Entered");
                const extraContainer=document.getElementById(containerMap["week-task__btn"][0]);
                containers.push(extraContainer)
            }
        }
    }
    return containers;
}


const updateTodayNumber=()=>{
    const spans=document.querySelectorAll(".today-number");
    const number=Array.from(document.getElementById('today-tasks').childNodes).filter(node=>node.nodeType===Node.ELEMENT_NODE).length;
    spans.forEach(span=>{
        span.innerText=number;
    })
}

const updateUpcomingNumber=()=>{
    const spans=document.querySelectorAll('.upcoming-number');
    const number=Array.from(document.getElementById('today-tasks').childNodes).filter(node=>node.nodeType===Node.ELEMENT_NODE).length+Array.from(document.getElementById('tomorrow-tasks').childNodes).filter(node=>node.nodeType===Node.ELEMENT_NODE).length+Array.from(document.getElementById('week-tasks').childNodes).filter(node=>node.nodeType===Node.ELEMENT_NODE).length;

    spans.forEach(span=>{
        span.innerText=number;
    })
}   




const links=document.querySelectorAll(".nav-links");

const pages={};
document.querySelectorAll(".page").forEach(page=>{
    pages[page.id]=page;
})

const showPage=(key)=>{
    Object.values(pages).forEach(page=>{
        page.classList.remove('active');
    })

    if(pages[key]){
        pages[key].classList.add('active');
    }
    
}

links.forEach(link=>
    link.addEventListener(
        'click',(event)=>{
            event.preventDefault();
            const pageId=`${link.id}-page`;
            resetForm();
            showPage(pageId);
        }
    )
)


// Set initial value for the openMenu variable
let openMenu = null;

// Select the parent container where all the notes reside
const notesContainer = document.querySelector('.notes-container');

// Event delegation: Attach event listener to the parent container
notesContainer.addEventListener('click', (event) => {
    // Check if the clicked element is the ellipsis icon
    if (event.target.classList.contains('note-more')) {
        const currentMenu = event.target.nextElementSibling; // Select the menu next to the ellipsis icon
        
        // If another menu is open and it's not the current one, close it
        if (openMenu && openMenu !== currentMenu) {
            openMenu.classList.remove('active');
        }

        // Toggle the current menu's active state
        currentMenu.classList.toggle('active');

        // Update the openMenu reference based on the current menu's state
        openMenu = currentMenu.classList.contains('active') ? currentMenu : null;

        // Prevent event from bubbling up further
        event.stopPropagation();
    }
});

// Close the open menu when clicking outside of it
document.addEventListener('click', () => {
    if (openMenu) {
        openMenu.classList.remove('active');
        openMenu = null;
    }
});


document.addEventListener('click', function () {
    if (openMenu) {
      openMenu.classList.remove('active'); // Close the currently open menu
      openMenu = null; // Reset the openMenu variable
    }
});



showPage("upcoming-page")
displayListTypes();
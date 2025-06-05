// //Opening and closing the nav bar.
// const navBar=document.querySelector(".nav");
// const menuBtn=document.getElementById("menu-btn");
// menuBtn.addEventListener('click',()=>{
//     navBar.classList.toggle("hide");
//     if (addListSection.classList.contains('open')){
//         addListSection.classList.remove('open');
//     }
// })

// //Clicking add task 
// const addTask=document.querySelector(".add-task");
// const addTaskBtn=document.querySelectorAll(".add-task__btn");
// addTaskBtn.forEach(btn=>{
//     btn.addEventListener("click",(event)=>{
//         addTask.classList.add("open");
//         setValues(btn.dataset.id);
//     })
// })

// //Closing the add task section
// const closeBtn=document.querySelector(".close");
// closeBtn.addEventListener("click",()=>{
//             document.querySelector(".error").classList.remove('open');
//             if (document.getElementById("title").value!==""){
//                 alert("Are you sure ?");
//             }
//             else{
//                 resetForm();
//                 closeBtn.closest('.add-form__container').classList.remove('open');
//             }
// })

// function setValues(id){
//     const selectDate=document.getElementById("due-date");
//     selectDate.disabled=false;
//     selectDate.min=new Date().toISOString().split("T")[0];
//     if (types.includes(id)){
//         setType(id);
//     }else{
//         setDate(id,selectDate)
//     }
// }

// function setType(id){
//     const selectType=document.getElementById('type');
//     selectType.value=id;
//     selectType.querySelectorAll("option").forEach(option => {
//         // Disable all options that are NOT selected
//         option.disabled = option.value !== id;
//     });
// }


// //Setting the date of task form according to the need.
// function setDate(id,selectDate){
    
//     selectDate.value='';
//     const today=new Date();
//     if (id==="today"){
//         selectDate.value=today.toISOString().split('T')[0];
//         selectDate.disabled=true;
//     }
//     else if(id==="tomorrow"){
//         const tomorrow=new Date(today);
//         tomorrow.setDate(today.getDate()+1);
//         selectDate.disabled=true;
//         selectDate.value=tomorrow.toISOString().split('T')[0];
//     }
//     else if(id==="week"){
//         const minimumDate=new Date(today);
//         minimumDate.setDate(today.getDate()+2);
//         const maximumDate=new Date(today);
//         maximumDate.setDate(today.getDate()+7);
//         selectDate.min=minimumDate.toISOString().split('T')[0];
//         selectDate.max=maximumDate.toISOString().split('T')[0];
//     }
// }

// function resetForm(){
//     const form=document.getElementById("add-form");
//     form.reset();
//     const select=document.getElementById('due-date');
//     select.removeAttribute('min');
//     select.removeAttribute('max');
// }

// //Adding submit listener to the form.
// const form=document.getElementById("add-form");
// form.addEventListener('submit',(event)=>{
//     event.preventDefault();

//     const title=document.getElementById("title").value;
//     const dueDate=document.getElementById("due-date").value;
//     const error=document.querySelector(".error");
//     if (title===""){
//         error.classList.add("open");
//     }
//     else{
//         const description=document.getElementById("description").value;
//         const type=document.getElementById("type").value;
//         const priority=document.getElementById("priority").value;   
//         const btn=document.getElementById('btnId').value;
//         let task={
//             id: generateId(),
//             title: title,
//             type: type,
//             description: description,
//             due_date: dueDate,
//             priority:priority,
//             status:"incomplete"
//         }
//         tasks.push(task);
//         renderTask(task);
//         resetForm();
//         addTask.classList.remove('open');
//         error.classList.remove('open');
//     }   
// })


// const pages={};
// document.querySelectorAll(".page").forEach(page=>{
//     pages[page.id]=page;
// })

// const showPage=(key)=>{
//     Object.values(pages).forEach(page=>{
//         page.classList.remove('active');
//     })

//     if(pages[key]){
//         pages[key].classList.add('active');
//     }
    
// }

// const linkContainers=document.querySelectorAll('.nav-section__list');
// linkContainers.forEach(linkContainer=>
//     linkContainer.addEventListener(
//         'click',(event)=>{
//             const clickedItem=event.target.closest('li');
//             const link=clickedItem.querySelector('a');
//             if (link.classList.contains("nav-links")){
//                 handleNavUi(link);
//                 event.preventDefault();
//                 const pageId=`${link.id}-page`;
//                 resetForm();
//                 showPage(pageId);
//             }
//         }
//     )
// )

// function handleNavUi(link){
//     const allNavLinks=document.querySelectorAll('.nav-links');
//     allNavLinks.forEach(link=>link.classList.remove('active'));
//     link.classList.add('active');
//     const allNavNumbers=document.querySelectorAll('.nav-number');
//     allNavNumbers.forEach(number=>number.classList.remove('active'));
//     const number=link.querySelector('.nav-number');
//     number.classList.add('active');
// }


// let dummy_tasks = [
//     {
//         id: generateId(),
//         title: "Complete project",
//         type: "personal",
//         description: "Complete the to-do list project",
//         due_date: generateDummyDate(0),
//         priority: "high",
//         status:"incomplete"
//     },
//     {
//         id: generateId(),
//         title: "Buy groceries",
//         type: "personal",
//         description: "Buy milk, eggs, and bread",
//         due_date: generateDummyDate(0),
//         priority: "medium",
//         status:"incomplete"
//     },
//     {
//         id: generateId(),
//         title: "Read a book",
//         type: "work",
//         description: "Read 10 pages of a book",
//         due_date: generateDummyDate(0),
//         priority: "low",
//         status:"incomplete"
//     },
//     {
//         id: generateId(),
//         title: "Workout",
//         type: "personal",
//         description: "Exercise for 30 minutes",
//         due_date: generateDummyDate(1),
//         priority: "high",
//         status:"incomplete"
//     },
//     {
//         id: generateId(),
//         title: "Call a friend",
//         type: "personal",
//         description: "Catch up with an old friend",
//         due_date: generateDummyDate(1),
//         priority: "medium",
//         status:"incomplete"
//     },
//     {
//         id: generateId(),
//         title: "Eat dinner",
//         type: "personal",
//         description: "Eat",
//         due_date: generateDummyDate(1),
//         priority: "high",
//         status:"incomplete"
//     },
//     {
//         id: generateId(),
//         title: "Attend meeting",
//         type: "work",
//         description: "Attend the meeting via video call",
//         due_date: generateDummyDate(2),
//         priority: "high",
//         status:"incomplete"
//     },
//     {
//         id: generateId(),
//         title: "Order products",
//         type: "work",
//         description: "Order raw materials",
//         due_date: generateDummyDate(2),
//         priority: "high",
//         status:"incomplete"
//     },
//     {
//         id: generateId(),
//         title: "Buy clothes",
//         type: "personal",
//         description: "Buy clothes for wedding.",
//         due_date: generateDummyDate(10),
//         priority: "high",
//         status:"incomplete"
//     },
//     {
//         id: generateId(),
//         title: "Make presentation",
//         type: "work",
//         description: "Create presentation for client meeting",
//         due_date: generateDummyDate(15),
//         priority: "high",
//         status:"incomplete"
//     }
// ];


// function generateDummyDate(daysFromToday){
//     const date=new Date();
//     date.setDate(date.getDate()+daysFromToday);
//     return date.toISOString().split('T')[0];
// }

// function saveTasks(){
//     localStorage.setItem("dummy_tasks",JSON.stringify(dummy_tasks));
// }

// function loadTasks(){
//     let storedTasks=localStorage.getItem("dummy_tasks");
//     let tasks=storedTasks ? JSON.parse(storedTasks) : [];
//     return tasks;
// }

// function generateId() {
//     return Date.now() + Math.floor(Math.random() * 1000); 
// }


// function classifyTasks(tasks){
//     if (tasks.length=='0'){
//         const taskByDates={
//             today:[],
//             tomorrow:[],
//             week:[]
//         };
//         const taskByTypes={
//             personal:[],
//             work:[]
//         };
//         return taskByDates,taskByTypes;
//     } else{
//         const taskByDates=classifyDates(tasks);
//         const taskByTypes=classifyTypes(tasks);
//         return {taskByDates,taskByTypes};
//     }

    
// }

// function getDates(){
//     const today = new Date();
//     const todayStr = today.toISOString().split("T")[0]; 

//     const tomorrow = new Date();
//     tomorrow.setDate(today.getDate() + 1);
//     const tomorrowStr = tomorrow.toISOString().split("T")[0];

//     const startOfWeek=new Date(today);
//     startOfWeek.setDate(today.getDate()+2);
//     startOfWeek.setHours(0,0,0,0);

//     const endOfWeek=new Date(today);
//     endOfWeek.setDate(today.getDate()+7);
//     endOfWeek.setHours(23,59,59,999);

//     return {todayStr,tomorrowStr,startOfWeek,endOfWeek};
// }

// function classifyDates(tasks){
//     let {todayStr,tomorrowStr,startOfWeek,endOfWeek}=getDates();

//     const taskByDates={
//         today:[],
//         tomorrow:[],
//         week:[]
//     };

//     tasks.forEach(task=>{
//         const taskDate=new Date(task.due_date);
//         taskDate.setHours(0,0,0,0);
//         const taskDateStr=task.due_date;

//         if (taskDateStr===todayStr){
//             taskByDates.today.push(task);
//         }else if (taskDateStr===tomorrowStr){
//             taskByDates.tomorrow.push(task);
//         }else if (taskDate>=startOfWeek && taskDate<=endOfWeek){
//             taskByDates.week.push(task);
//         }

//     })
//     return taskByDates;
// }

// function classifyTypes(tasks){
//     const taskByTypes={};
//     types.forEach(type=>taskByTypes[type]=[]);

//     tasks.forEach(task=>{
//         if (task.type in taskByTypes){
//             taskByTypes[task.type].push(task);
//         }
//     })
//     return taskByTypes;
// }

// function renderTask(task) {
//     let node=createTaskNode(task);
//     let containers=getContainers(task);
//     addToContainers(node,containers);
//     updateNumbers(task);
// }

// function createTaskNode(task){
//     //Creating required elements and adding the attributes.
//     const div=document.createElement('div');
//     div.className="task";
//     div.setAttribute('data-id',task.id);

//     const checkbox=document.createElement('input');
//     checkbox.type="checkbox";
//     checkbox.className="select-box";

//     const titleParagraph=document.createElement('p');
//     titleParagraph.textContent=task.title;

//     const moreIcon=document.createElement('img');
//     moreIcon.src="src/assets/more.svg";

//     //Appening all the elements to the div.
//     div.appendChild(checkbox);
//     div.appendChild(titleParagraph);
//     div.appendChild(moreIcon);

//     return div;
// }


// function getContainers(task){
//     let containers=[];
//     containers.push(document.getElementById('all-tasks'));
//     containers.push(...classifyByDate(task,taskByDates));
//     containers.push(...classifyByType(task,taskByTypes));
//     return containers;
// }


// function addToContainers(node,containers){
//     containers.forEach(container=>{
//         container.appendChild(node.cloneNode(true));
//     })
// }

// function classifyByDate(task,taskByDates){
//     let {todayStr,tomorrowStr,startOfWeek,endOfWeek}=getDates();
    
//     const taskDate=new Date(task.due_date);
//     taskDate.setHours(0,0,0,0);
//     const taskDateStr=task.due_date;
    
//     if (taskDateStr===todayStr){
//         taskByDates.today.push(task);
//         return document.querySelectorAll('.today-tasks');
//     }else if (taskDateStr===tomorrowStr){
//         taskByDates.tomorrow.push(task);
//         return document.querySelectorAll('.tomorrow-tasks');
//     }else if (taskDate>=startOfWeek && taskDate<=endOfWeek){
//         taskByDates.week.push(task);
//         return document.querySelectorAll('.week-tasks');
//     }   
//     console.log(taskByDates);
// }

// function classifyByType(task,taskByTypes){
//     taskByTypes[task.type].push(task);
//     return document.querySelectorAll(`.${task.type}-tasks`);
// }


// function displayAll(tasks){
//     const container=document.getElementById('all-tasks');

//     tasks.forEach(task=>{
//         const div=createTaskNode(task);
//         container.appendChild(div);

//         dipslayByDates(task,div);
//         displayByTypes(task,div);

//         updateNumbers(task);
//     })
// }

// function dipslayByDates(newTask,node){
//     if (taskByDates.today.some(task=>task.id==newTask.id)){
//         document.querySelectorAll('.today-tasks').forEach(container=>{
//             container.appendChild(node.cloneNode(true));
//         })
//     } else if (
//         taskByDates.tomorrow.some(task => task.id == newTask.id) || 
//         taskByDates.week.some(task => task.id == newTask.id)
//     ) {
//         const container = taskByDates.tomorrow.some(task => task.id == newTask.id)
//             ? document.querySelector('.tomorrow-tasks')
//             : document.querySelector('.week-tasks');
    
//         container.appendChild(node.cloneNode(true));
//     }
// }

// function displayByTypes(newTask,node){
//     document.getElementById(`${newTask.type}-tasks`).appendChild(node.cloneNode(true));
// }


// function updateNumbers(task){
//     let allContainers=document.querySelectorAll('.all-number');
//     allContainers.forEach(container=>{
//         container.textContent=tasks.length;
//     })

//     let typeContainers=document.querySelectorAll(`.${task.type}-number`);
//     typeContainers.forEach(container=>{
//         container.textContent=taskByTypes[task.type].length;
//     })

//     let todayContainers=document.querySelectorAll('.today-number');
//     todayContainers.forEach(container=>{
//         container.textContent=taskByDates.today.length;
//     })

//     let upcomingContainers=document.querySelectorAll('.upcoming-number');
//     let upcomingNumber=Object.values(taskByDates).reduce((sum, arrays)=>sum+arrays.length,0);
//     upcomingContainers.forEach(container=>{
//         container.textContent=upcomingNumber;
//     })

// }





// let selectedTaskIds=[];
// const mainParent=document.querySelector('.body-content');
// mainParent.addEventListener('click',(event)=>{
//     const target=event.target;

//     if (target.classList.contains('select-box')){
//         handleTaskSelection(target);
//         buttonsVisibility(target);
//     }
    
//     if (target.id=='delete-button'){
//         handleTaskDelete(selectedTaskIds);
//         buttonsVisibility(target);
//     }
// })



// function handleTaskSelection(target){
//     let taskDiv=target.closest('.task');
//     let taskId=taskDiv.dataset.id;
    
//     if (selectedTaskIds.includes(taskId)){
//         selectedTaskIds=selectedTaskIds.filter(task=>task!=taskId);
//     }else{
//         selectedTaskIds.push(taskId);
//     }
// }

// function handleTaskDelete(taskIds){
//     taskIds.forEach(taskId=>{
//         let task= tasks.find(task=>task.id==taskId);
//         tasks = tasks.filter(task => task.id != taskId);
//         if (taskByDates.today.some(t => t.id == taskId)) {
//             taskByDates.today = taskByDates.today.filter(t => t.id != taskId);
//         } else if (taskByDates.tomorrow.some(t => t.id == taskId)) {
//             taskByDates.tomorrow = taskByDates.tomorrow.filter(t => t.id != taskId);
//         } else if (taskByDates.week.some(t => t.id == taskId)) {
//             taskByDates.week = taskByDates.week.filter(t => t.id != taskId);
//         }
//         taskByTypes[task.type] = taskByTypes[task.type].filter(t => t.id != taskId);
//         const taskNode=document.querySelectorAll(`.task[data-id="${taskId}"]`);
//         taskNode.forEach(id=>id.remove());
//         updateNumbers(task);
//     })
//     selectedTaskIds=[];
// }


// function buttonsVisibility(target){
//     const page=target.closest('.page');
//     const buttonsContainer=page.querySelector('.buttons-container');
//     if (selectedTaskIds.length!=0){
//         buttonsContainer.classList.add('active');
//     }else{
//         buttonsContainer.classList.remove('active');
//     }
// }


// showPage("upcoming-page")
// saveTasks();
// let tasks =loadTasks();
// let types=['personal','work'];
// let {taskByDates,taskByTypes}=classifyTasks(tasks);
// displayAll(tasks);








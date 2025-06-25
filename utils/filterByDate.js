const filterByDate=(tasks)=>{
    let {todayStr,tomorrowStr,startOfWeek,endOfWeek}=getDates();

    const taskByDates={
        today:[],
        tomorrow:[],
        week:[]
    };

    tasks.forEach(task=>{
        console.log(task.date);
        const taskDate=new Date(task.date);
        const taskDateStr=taskDate.toISOString().split("T")[0]; 
        console.log(taskDateStr);


        if (taskDateStr===todayStr){
            taskByDates.today.push(task);
        }else if (taskDateStr===tomorrowStr){
            taskByDates.tomorrow.push(task);
        }else if (taskDate>=startOfWeek && taskDate<=endOfWeek){
            taskByDates.week.push(task);
        }

    })
    return taskByDates;
}


function getDates(){
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; 

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const startOfWeek=new Date(today);
    startOfWeek.setDate(today.getDate()+2);
    startOfWeek.setHours(0,0,0,0);

    const endOfWeek=new Date(today);
    endOfWeek.setDate(today.getDate()+7);
    endOfWeek.setHours(23,59,59,999);

    return {todayStr,tomorrowStr,startOfWeek,endOfWeek};
}

export {filterByDate};
function getTaskCounts(tasks,filteredTasks){
    console.log(tasks);
    console.log(filteredTasks);
    const taskCounts={
        upcoming: 0,
        today: 0,   
        all: 0,
        personal: 0,    
        work: 0
    }

    tasks.forEach(task=>{
        if (task.type=="personal") {
            taskCounts.personal++;
        }
        if (task.type=="work") {
            taskCounts.work++;
        }
    })

    taskCounts.all = tasks.length;
    taskCounts.upcoming = Object.values(filteredTasks).reduce((sum, arr) => sum + arr.length, 0);
    taskCounts.today = filteredTasks.today.length;
    return taskCounts;
}

export { getTaskCounts };
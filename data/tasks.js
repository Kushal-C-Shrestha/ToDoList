let data = [
    {
        id: generateId(),
        title: "Complete project",
        type: "personal",
        description: "Complete the to-do list project",
        due_date: generateDummyDate(0),
        priority: "high",
        status:"incomplete"
    },
    {
        id: generateId(),
        title: "Buy groceries",
        type: "personal",
        description: "Buy milk, eggs, and bread",
        due_date: generateDummyDate(0),
        priority: "medium",
        status:"incomplete"
    },
    {
        id: generateId(),
        title: "Read a book",
        type: "work",
        description: "Read 10 pages of a book",
        due_date: generateDummyDate(0),
        priority: "low",
        status:"incomplete"
    },
    {
        id: generateId(),
        title: "Workout",
        type: "personal",
        description: "Exercise for 30 minutes",
        due_date: generateDummyDate(1),
        priority: "high",
        status:"incomplete"
    },
    {
        id: generateId(),
        title: "Call a friend",
        type: "personal",
        description: "Catch up with an old friend",
        due_date: generateDummyDate(1),
        priority: "medium",
        status:"incomplete"
    },
    {
        id: generateId(),
        title: "Eat dinner",
        type: "personal",
        description: "Eat",
        due_date: generateDummyDate(1),
        priority: "high",
        status:"incomplete"
    },
    {
        id: generateId(),
        title: "Attend meeting",
        type: "work",
        description: "Attend the meeting via video call",
        due_date: generateDummyDate(2),
        priority: "high",
        status:"incomplete"
    },
    {
        id: generateId(),
        title: "Order products",
        type: "work",
        description: "Order raw materials",
        due_date: generateDummyDate(2),
        priority: "high",
        status:"incomplete"
    },
    {
        id: generateId(),
        title: "Buy clothes",
        type: "personal",
        description: "Buy clothes for wedding.",
        due_date: generateDummyDate(10),
        priority: "high",
        status:"incomplete"
    },
    {
        id: generateId(),
        title: "Make presentation",
        type: "work",
        description: "Create presentation for client meeting",
        due_date: generateDummyDate(15),
        priority: "high",
        status:"incomplete"
    }
];


function generateDummyDate(daysFromToday){
    const date=new Date();
    date.setDate(date.getDate()+daysFromToday);
    return date.toISOString().split('T')[0];
}

function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000); 
}

export default data;
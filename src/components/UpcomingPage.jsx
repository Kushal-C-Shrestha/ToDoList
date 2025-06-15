import React from "react";
import Footer from "./Footer";
import TaskCard from "./TaskCard";

const UpcomingPage = ({title,tasks,taskCount,showForm,setShowForm,setSelectedTask,footer,setSource}) => {
  const handleFormToggle= (e) => {
    setShowForm(!showForm);
    const target= e.target.dataset.id;
    if (target === "today") {
      setSource("today");
    } else if (target === "tomorrow") {
      setSource("tomorrow");
    } else if (target === "week") {
      setSource("week");
    }
  };

  return (
    <div className="main page active" id="upcoming-page">
      <div className="main-contents">
        <div className="main-header">
          <h1>{title}</h1>
          <span
            id="upcoming-number"
            className="upcoming-number header-number"
          >
            {taskCount}
          </span>
        </div>
        <div className="main-upper task-sections">
          <h3>Today</h3>
          <button
            className="add-task__btn"
            id="today-task__btn"
            data-id="today"
            onClick={handleFormToggle}
          >
            <img src="src/assets/plus.svg" alt="" />
            Add New Task
          </button>
          <div className="tasks today-tasks" id="today-tasks">
            {tasks.today.map((task) => (
              <TaskCard key={task.id} task={task} setSelectedTask={setSelectedTask} />
            ))}
          </div>
        </div>
        <div className="main-lower">
          <div className="main-lower__tomorrow task-sections">
            <h3>Tomorrow</h3>
            <button
              className="add-task__btn"
              id="tomorrow-task__btn"
              data-id="tomorrow"
              onClick={handleFormToggle}
            >
              <img src="src/assets/plus.svg" alt="" /> Add new task
            </button>
            <div className="tasks tomorrow-tasks" id="tomorrow-tasks">
              {tasks.tomorrow.map((task) => (
                <TaskCard key={task.id} task={task} setSelectedTask={setSelectedTask} />
              ))}
            </div>
          </div>
          <div className="main-lower__week task-sections">
            <h3>This week</h3>
            <button
              className="add-task__btn"
              id="week-task__btn"
              data-id="week"
              onClick={handleFormToggle}
            >
              <img src="src/assets/plus.svg" alt="" /> Add new task
            </button>
            <div className="tasks week-tasks" id="week-tasks">
              {tasks.week.map((task) => (
                <TaskCard key={task.id} task={task} setSelectedTask={setSelectedTask} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {footer && <Footer />}
    </div>
  );
};

export default UpcomingPage;

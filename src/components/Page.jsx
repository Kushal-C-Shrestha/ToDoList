import React, { useState } from "react";
import Footer from "./Footer";
import "./Page.css";
import TaskCard from "./TaskCard";

const Page = ({
  title,
  tasks,
  taskCount,
  showForm,
  setShowForm,
  selectedTask,
  setSelectedTask,
  setShowFooter,
  showFooter,
  setSource,
  setTasks,
  setFormData,
  setTaskId
}) => {
  const handleFormToggle = (e) => {
    console.log("Form toggle clicked");
    setShowForm(!showForm);
    const target = e.target.dataset.id;
    if (target === "personal") {
      setSource("personal");
    } else if (target === "work") {
      setSource("work");
    } else if (target === "today") {
      setSource("today");
    }
  };

  return (
    <div className="main page active" id={`${title}-page`}>
      <div className="main-contents">
        <div className="main-header">
          <h1>{title}</h1>
          <span
            id={`${title.toLowerCase()}-number`}
            className={`${title.toLowerCase()}-number header-number`}
          >
            {taskCount}
          </span>
        </div>

        <button
          className="add-task__btn"
          id={`${title}-task__btn`}
          data-id={title.toLowerCase()}
          onClick={handleFormToggle}
        >
          <img src="src/assets/plus.svg" alt="" />
          Add New Task
        </button>
        <div
          className={`tasks ${title.toLowerCase()}-tasks`}
          id={`${title.toLowerCase()}-tasks`}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              setSelectedTask={setSelectedTask}
              tasks={tasks}
              setShowForm={setShowForm}
              setFormData={setFormData}
              setTaskId={setTaskId}
            />
          ))}
        </div>
      </div>
      {showFooter && <Footer selectedTasks={selectedTask} setTasks={setTasks} setShowFooter={setShowFooter}/>}
    </div>
  );
};

export default Page;

import { set } from "mongoose";
import React from "react";

const TaskCard = ({
  task,
  setSelectedTask,
  tasks,
  setShowForm,
  setTaskId,
  setFormData
}) => {


  const handleTaskClick = (e) => {
    const id = e.target.closest(".task").dataset.id;
    if (e.target.classList.contains("select-box")) return; // Ignore checkbox clicks
    setShowForm(true);
    console.log("Task clicked:", tasks);
    const {_id,...rest}=tasks.find(task=> task._id === id)
    setTaskId(_id);
    setFormData(rest);
  };

  const handleTaskSelect = (event) => {
    const taskId = event.target.closest(".task").dataset.id;
    if (event.target.checked) {
      setSelectedTask((prev) => [...prev, taskId]);
    } else {
      setSelectedTask((prev) => prev.filter((id) => id !== taskId));
    }
  };

  return (
    <div className="task" data-id={task._id} onClick={handleTaskClick}>
      <input
        type="checkbox"
        className="select-box"
        onChange={handleTaskSelect}
      />
      <p>{task.title}</p>
      <img src="src/assets/more.svg" />
    </div>
  );
};

export default TaskCard;

import React from "react";

const TaskCard = ({ task, setSelectedTask }) => {
  const handleTaskSelect = (event) => {
    const taskId = event.target.closest(".task").dataset.id;
    if (event.target.checked) {
      setSelectedTask((prev) => [...prev, taskId]);
    } else {
      setSelectedTask((prev) => prev.filter((id) => id !== taskId));
    }
  };

  return (
    <div className="task" data-id={task.id}>
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

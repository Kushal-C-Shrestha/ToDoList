import React from "react";

const TaskCard = (props) => {
  return (
    <div className="task" data-id="task-id">
      <input type="checkbox" className="select-box" />
      <p>{props.title}</p>
      <img src="src/assets/more.svg" />
    </div>
  );
};

export default TaskCard;

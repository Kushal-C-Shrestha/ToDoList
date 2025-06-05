import React from "react";
import Footer from "./Footer";
import './Page.css'; 
import TaskCard from './TaskCard';

const Page = (props) => {
  return (
    <div className="main page active" id={`${props.title}-page`}>
      <div className="main-contents">
        <div className="main-header">
          <h1>{props.title}title</h1>
          <span id="work-number" className="work-number header-number">{props.taskCount}1</span>
        </div>

        <button className="add-task__btn" id={`${props.title}-task__btn`} data-id="work">
          <img src="src/assets/plus.svg" alt="" />
          Add New Task
        </button>
        <div className="tasks work-tasks" id={`${props.title}-tasks`}>
          <TaskCard/>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;

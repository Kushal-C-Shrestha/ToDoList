import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddTask.css";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";

const AddTask = ({
  setShowForm,
  context,
  setTasks,
  taskId,
  setTaskId,
  formData,
  setFormData
}) => {
  const navigate = useNavigate();
  

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      type: context.type,
      date: context.date,
      priority: context.priority,
    }));
  }, [context]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskId!=null){
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          }
        })
      if (response.status == 200) {
        console.log("Task updated successfully:");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, ...formData } : task
          )
        );
        setShowForm(false);
        setTaskId(null);
      }
    }else{
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status == 201) {
        console.log("Task created successfully:");
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setShowForm(false);
        setTaskId(null);
      }
    }
  };

  return (
    <section className="add-task add-form__container open">
      <div className="add-task__header">
        <p>Task</p>
        <img
          src="/src/assets/close.svg"
          alt=""
          className="close"
          onClick={() =>{ setShowForm(false); setTaskId(null); }}
        />
      </div>
      <form className="add-task__form" id="add-form" onSubmit={handleSubmit}>
        <div className="form-groups form-texts">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Task"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <span className="error">Title cannot be empty!</span>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            rows="5"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="form-groups">
          <label htmlFor="type">List</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            disabled={context.typeDisabled}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div>

        <div className="form-groups">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="due-date"
            min={context.startDate}
            max={context.endDate}
            value={formData.date}
            disabled={context.dateDisabled}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="form-groups">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            id="priority"
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            value={formData.priority}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="add-task__form--buttons">
          <button type="button" id="deleteBtn">
            Delete Task
          </button>
          <button type="submit" id="saveBtn">
            Save changes
          </button>
        </div>

        <input type="hidden" name="btnId" id="btnId" />
      </form>
    </section>
  );
};

export default AddTask;

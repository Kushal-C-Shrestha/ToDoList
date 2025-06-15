import React, { useEffect, useState } from "react";
import "./AddTask.css";

const AddTask = ({ setShowForm, context }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    date: "",
    priority: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      type: context.type,
      date: context.date,
    }));
  }, [context]);

  console.log(formData);

  return (
    <section className="add-task add-form__container open">
      <div className="add-task__header">
        <p>Task</p>
        <img
          src="/src/assets/close.svg"
          alt=""
          className="close"
          onClick={() => setShowForm(false)}
        />
      </div>
      <form className="add-task__form" id="add-form">
        <div className="form-groups form-texts">
          <input type="text" name="title" id="title" placeholder="Task" />
          <span className="error">Title cannot be empty!</span>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            rows="5"
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
          <select name="priority" id="priority">
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

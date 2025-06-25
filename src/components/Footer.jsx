import React from "react";
import axios from "axios";
import './Footer.css'; 

const Footer = ({selectedTasks,setTasks, setShowFooter}) => {
  const handleDelete=async()=>{
    const response=await axios.delete("http://localhost:5000/api/tasks/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { ids: selectedTasks }
    })

    if (response.status==201){
      console.log("Task deleted successfully:");
      setTasks((prevTasks) => prevTasks.filter(task=> !selectedTasks.includes(task._id)));
      setShowFooter(false)
    }
  }

  const handleComplete=async()=>{
    const response=await axios.patch("http://localhost:5000/api/tasks/", 
      { ids: selectedTasks },
      {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }
    )

    if (response.status==200){
      console.log("Task marked as complete successfully:");
      setTasks((prevTasks) => 
        prevTasks.map(task => 
          selectedTasks.includes(task._id) ? { ...task, status: "completed" } : task
        )
      );
      setShowFooter(false);
    }

    
  }


  return (
    <div className="footer-contents">
      <div className="buttons-container active" data-id="personal-buttons_container">
        <button className="footer-buttons" id="delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="footer-buttons" id="complete-button" onClick={handleComplete}>
          Mark as complete
        </button>
      </div>
    </div>
  );
};

export default Footer;

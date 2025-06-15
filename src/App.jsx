import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import AddTask from "./components/AddTask.jsx";
import Page from "./components/Page.jsx";
import { filterByDate } from "../utils/filterByDate.js";
import UpcomingPage from "./components/UpcomingPage.jsx";
import { getTaskCounts } from "../utils/taskCounts.js";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { useLocation, useNavigate } from "react-router-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const hideNavBar= pathname === "/login" || pathname === "/register";
  const navigate = useNavigate();

  const defaultContext = {
    date: new Date().toISOString().split("T")[0],
    startDate: new Date().toISOString().split("T")[0],
    endDate: null,
    typeDisabled: false,
    dateDisabled: false,
    type: "personal",
    priority: "Low",
  };

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState({
    upcoming: 0,
    today: 0,
    all: 0,
    personal: 0,
    work: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [footer, showFooter] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [context, setContext] = useState(defaultContext);
  const [source, setSource] = useState(null);

  const filteredTasks = filterByDate(tasks);

  useEffect(() => {
    if (source === "today") {
      setContext({
        ...defaultContext,
        date: new Date().toISOString().split("T")[0],
        dateDisabled: true,
      });
    } else if (source === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setContext({
        ...defaultContext,
        date: tomorrow.toISOString().split("T")[0],
        dateDisabled: true,
      });
    } else if (source === "week") {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() + 2);
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + 7);
      setContext({
        ...defaultContext,
        startDate: startOfWeek.toISOString().split("T")[0],
        date: startOfWeek.toISOString().split("T")[0],
        endDate: endOfWeek.toISOString().split("T")[0],
        dateDisabled: false,
      });
    } else if (source === "work" || source === "personal") {
      setContext({
        ...defaultContext,
        type: source,
        typeDisabled: true,
      });
    }
  }, [source]);

  useEffect(() => {
    setShowForm(false);
  },[location])
    

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          navigate('/login');
          setLoading(false);
          throw new Error("Unauthorized access, redirecting to login.");
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    setCount(getTaskCounts(tasks, filteredTasks));
  }, [tasks]);

  useEffect(() => {
    showFooter(selectedTask.length > 0);
  }, [selectedTask]);


  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          method: "GET",
        },
      });

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }

    console.log(tasks);
  };

  fetchTasks();
}, []);


  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      {!hideNavBar && <Navbar taskCount={count} />}
      <Routes>
        <Route
          path="/"
          element={
            <UpcomingPage
              showForm={showForm}
              setShowForm={setShowForm}
              title="Upcoming"
              taskCount={count.upcoming}
              tasks={filteredTasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              footer={footer}
              setSource={setSource}
            />
          }
        />
        <Route
          path="/today"
          element={
            <Page
              showForm={showForm}
              setShowForm={setShowForm}
              title="Today"
              taskCount={count.today}
              tasks={filteredTasks.today}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              footer={footer}
              setSource={setSource}
            />
          }
        />
        <Route
          path="/all"
          element={
            <Page
              title="All Tasks"
              tasks={tasks}
              taskCount={tasks.length}
              showForm={showForm}
              setShowForm={setShowForm}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              footer={footer}
              setSource={setSource}
            />
          }
        />
        <Route
          path="/personal"
          element={
            <Page
              title="Personal"
              tasks={tasks.filter((task) => task.type === "personal")}
              taskCount={count.personal}
              showForm={showForm}
              setShowForm={setShowForm}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              footer={footer}
              setSource={setSource}
            />
          }
        />
        <Route
          path="/work"
          element={
            <Page
              title="Work"
              tasks={tasks.filter((task) => task.type === "work")}
              taskCount={count.work}
              showForm={showForm}
              setShowForm={setShowForm}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              footer={footer}
              setSource={setSource}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {showForm && <AddTask setShowForm={setShowForm} context={context} />}
      </>
  );
}

export default App;

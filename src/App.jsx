import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import AddTask from "./components/AddTask.jsx";
import Page from "./components/Page.jsx";
import { filterByDate } from "../utils/filterByDate.js";
import UpcomingPage from "./components/UpcomingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { getTaskCounts } from "../utils/taskCounts.js";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const hideNavBar = pathname === "/login" || pathname === "/register";
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const defaultContext = {
    date: new Date().toISOString().split("T")[0],
    startDate: new Date().toISOString().split("T")[0],
    endDate: null,
    typeDisabled: false,
    dateDisabled: false,
    type: "personal",
    priority: "Low",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState({
    upcoming: 0,
    today: 0,
    all: 0,
    personal: 0,
    work: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [context, setContext] = useState(defaultContext);
  const [source, setSource] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState({
    today: [],
    tomorrow: [],
    week: [],
  });

  const [taskId, setTaskId] = useState(null);

  const [formData, setFormData] = useState({
      title: "",
      description: "",
      type: "",
      date: "",
      priority: "",
    });

  //To fetch data from the server if the user is logged in.
  useEffect(() => {
    if (!isLoggedIn) {
      console.log("User is not logged in, redirecting to login page.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        console.log("Fetching tasks with token:", token);
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setTasks(response.data);
        setFilteredTasks(filterByDate(response.data));
        setCount(getTaskCounts(response.data, filterByDate(response.data)));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isLoggedIn]);

  //To set context of the form to populate data based on the source of event.
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
  //To show the footer when one or more tasks are selected.
  useEffect(() => {
    setShowFooter(selectedTask.length > 0);
  }, [selectedTask]);

  //To close the form when the location changes.
  useEffect(() => {
    setShowForm(false);
    setContext(defaultContext);
  }, [location]);

  //To set the count and filter tasks when the tasks change.
  useEffect(() => {
    setFilteredTasks(filterByDate(tasks));
    setCount(getTaskCounts(tasks, filterByDate(tasks)));
  }, [tasks]);

  return (
    <>
      {!hideNavBar && <Navbar taskCount={count} />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              {!loading ? (
                <UpcomingPage
                  showForm={showForm}
                  setShowForm={setShowForm}
                  title="Upcoming"
                  taskCount={count.upcoming}
                  tasks={filteredTasks}
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  showFooter={showFooter}
                  setShowFooter={setShowFooter}
                  setSource={setSource}
                  setTasks={setTasks}
                  setTaskId={setTaskId}
                  setFormData={setFormData}
                />
              ) : (
                <div className="loading">Loading tasks...</div>
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/today"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Page
                showForm={showForm}
                setShowForm={setShowForm}
                title="Today"
                taskCount={count.today}
                tasks={filteredTasks.today}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                showFooter={showFooter}
                setShowFooter={setShowFooter}
                setSource={setSource}
                setTasks={setTasks}
                setTaskId={setTaskId}
                setFormData={setFormData}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Page
                title="All Tasks"
                tasks={tasks}
                taskCount={tasks.length}
                showForm={showForm}
                setShowForm={setShowForm}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                showFooter={showFooter}
                setShowFooter={setShowFooter}
                setSource={setSource}
                setTasks={setTasks}
                setTaskId={setTaskId}
                setFormData={setFormData}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/personal"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Page
                title="Personal"
                tasks={tasks.filter((task) => task.type === "personal")}
                taskCount={count.personal}
                showForm={showForm}
                setShowForm={setShowForm}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                showFooter={showFooter}
                setShowFooter={setShowFooter}
                setSource={setSource}
                setTasks={setTasks}
                setTaskId={setTaskId}
                setFormData={setFormData}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/work"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Page
                title="Work"
                tasks={tasks.filter((task) => task.type === "work")}
                taskCount={count.work}
                showForm={showForm}
                setShowForm={setShowForm}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                showFooter={showFooter}
                setShowFooter={setShowFooter}
                setSource={setSource}
                setTasks={setTasks}
                setTaskId={setTaskId}
                setFormData={setFormData}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>

      {showForm && (
        <AddTask
          setShowForm={setShowForm}
          context={context}
          setTasks={setTasks}
          taskId={taskId}
          setTaskId={setTaskId}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
}

export default App;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ActivitiesPage() {
  const navigate = useNavigate();


  const [activities, setActivities] = useState([
    { name: "Planting Rice", status: "pending" },
    { name: "Watering Coconut Trees", status: "completed" },
    { name: "Fertilizing Rice Field", status: "pending" },
  ]);

  const [newTask, setNewTask] = useState("");

  
  const toggleStatus = (index) => {
    const updated = [...activities];
    updated[index].status =
      updated[index].status === "completed" ? "pending" : "completed";
    setActivities(updated);
  };

 
  const addTask = () => {
    if (newTask.trim() === "") return;
    setActivities([...activities, { name: newTask, status: "pending" }]);
    setNewTask("");
  };


  const deleteTask = (index) => {
    const updated = activities.filter((_, i) => i !== index);
    setActivities(updated);
  };

  return (
    <main className="page">
      <div className="container">
       
        <div className="dashboard-header">
          <div className="dh-left">
            <span className="dh-icon">📅</span>
            <div>
              <h1 className="dh-title">Daily Activities</h1>
              <p className="dh-subtitle">
                Track, add, and manage your farm tasks
              </p>
            </div>
          </div>
          <div className="dh-right">
            <button onClick={() => navigate(-1)} className="dh-btn">
            Back
            </button>
          </div>
        </div>

      
        <div className="add-task">
          <input
            type="text"
            placeholder="Enter new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="task-input"
          />
          <button onClick={addTask} className="dh-btn">
            Add Task
          </button>
        </div>

       
        <div className="activities-grid">
          {activities.map((act, index) => (
            <div
              key={index}
              className={`activity-card ${
                act.status === "completed" ? "completed" : ""
              }`}
            >
              <div className="activity-info" onClick={() => toggleStatus(index)}>
                <h3 className="activity-name">{act.name}</h3>
                <span
                  className={`activity-status ${
                    act.status === "completed" ? "done" : "pending"
                  }`}
                >
                  {act.status === "completed" ? "Completed" : " Pending"}
                </span>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
                title="Delete Task"
              >
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectOverview() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userName, setUserName] = useState("User");
  const [userLocation, setUserLocation] = useState("Location");

  const navigate = useNavigate();

  const tabs = [
    { name: "Dashboard", icon: "📊" },
    { name: "AI Chat", icon: "💬" },
    { name: "Activities", icon: "📅" },
    { name: "Alerts", icon: "🔔" },
    { name: "Knowledge", icon: "📚" },
    { name: "Schemes", icon: "🎯" },
  ];

  const tasks = [
    { task: "planting - Rice", status: "completed" },
    { task: "watering - Coconut trees", status: "completed" },
    { task: "fertilizing - Rice field", status: "completed" },
  ];

  const farmProgress = [
    { name: "Rice Cultivation", percent: 75 },
    { name: "Coconut Care", percent: 60 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        if (profile.name) setUserName(profile.name);
        if (profile.location) setUserLocation(profile.location);
      } catch {}
    }
  }, []);

  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

    if (tabName === "Alerts") navigate("/alerts");
    else if (tabName === "Schemes") navigate("/schemes");
    else if (tabName === "Knowledge") navigate("/knowledge");
	else if (tabName === "Activities") navigate("/activities");
  else if (tabName === "AI Chat") navigate("/chatbot");
  };

  return (
    <main className="page">
      <div className="container">
        
        <div className="dashboard-header">
          <div className="dh-left">
            <span className="dh-icon">🌿</span>
            <div>
              <h1 className="dh-title">Krishi Kisan</h1>
              <p className="dh-subtitle">Welcome back, {userName}</p>
            </div>
          </div>
          <div className="dh-right">
            <button className="dh-btn">📌 {userLocation}</button>
            <button className="dh-btn" onClick={() => navigate("/profile")}>
              👤 Profile
            </button>
          </div>
        </div>

       
        <nav className="dashboard-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`tab-btn ${activeTab === tab.name ? "active" : ""}`}
              onClick={() => handleTabClick(tab.name)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>

       
        <div className="dashboard-grid">
          
          <div className="dash-card">
            <div className="dc-header">
              <span className="dc-icon">📋</span>
              <h3 className="dc-title">Today's Tasks</h3>
            </div>
            <div className="task-list">
              {tasks.map((t, i) => (
                <div key={i} className="task-row">
                  <span className="task-name">{t.task}</span>
                  <span className="task-status">{t.status}</span>
                </div>
              ))}
            </div>
          </div>

  
          <div className="dash-card">
            <div className="dc-header">
              <span className="dc-icon">🔔</span>
              <h3 className="dc-title">Weather Alert</h3>
            </div>
            <div className="weather-alert">
              <div className="wa-badge">Heavy Rain Expected</div>
              <p className="wa-text">
                Next 2 days - Protect crops from waterlogging
              </p>
              <p className="wa-meta">Temperature: 28°C | Humidity: 85%</p>
            </div>
          </div>

        
          <div className="dash-card">
            <div className="dc-header">
              <span className="dc-icon">📈</span>
              <h3 className="dc-title">Farm Progress</h3>
            </div>
            <div className="progress-list">
              {farmProgress.map((fp, i) => (
                <div key={i} className="progress-item">
                  <div className="pi-header">
                    <span className="pi-name">{fp.name}</span>
                    <span className="pi-percent">{fp.percent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${fp.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

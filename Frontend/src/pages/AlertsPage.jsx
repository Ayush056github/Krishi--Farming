import { useNavigate } from "react-router-dom";

export default function AlertsPage() {
  const navigate = useNavigate();
  return (
    <main className="page">
      <div className="container">
        <h1>Weather Alerts</h1>
        <ul>
          <li>🌧 Heavy Rain Expected for next 2 days</li>
          <li>💧 Waterlogging risk - Protect crops</li>
          <li>🌡 Temperature: 28°C | Humidity: 85%</li>
        </ul>
        <button onClick={() => navigate(-1)} className="dh-btn">
        Back
        </button>
      </div>
    </main>
  );
}

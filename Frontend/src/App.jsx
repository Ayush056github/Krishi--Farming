import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ChatbotWidget from "./components/ChatbotWidget.jsx";
import Home from "./pages/Home.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import SmartEngine from "./pages/SmartEngine.jsx";
import ProjectOverview from "./pages/ProjectOverview.jsx";
import AlertsPage from "./pages/AlertsPage.jsx";
import SchemesPage from "./pages/SchemesPage.jsx";
import KnowledgePage from "./pages/KnowledgePage.jsx";
import ActivitiesPage from "./pages/ActivitiesPage.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import { ImageProvider } from "./contexts/ImageContext.jsx";

export default function App() {
	return (
		<ImageProvider>
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/chatbot" element={<Chatbot />} />
					<Route path="/smart-engine" element={<SmartEngine />} />
					<Route path="/project-overview" element={<ProjectOverview />} />
					<Route path="/alerts" element={<AlertsPage />} />
					<Route path="/schemes" element={<SchemesPage />} />
					<Route path="/knowledge" element={<KnowledgePage />} />
					<Route path="/activities" element={<ActivitiesPage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/about" element={<About />} />
				</Routes>
				<ChatbotWidget />
			</div>
		</ImageProvider>
	);
}

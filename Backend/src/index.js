import "dotenv/config";
import http from "http";
import { createApp } from "./app.js";

const app = createApp();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

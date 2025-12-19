// server.js
import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Make sure db.json is in same folder
const middlewares = jsonServer.defaults();

// Enable CORS so your frontend (on Vercel) can talk to backend
server.use(cors());
server.use(middlewares);
server.use(router);

// Use Render's PORT or fallback to 3000 (local testing)
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`✅ JSON Server is running on port ${port}`);
});

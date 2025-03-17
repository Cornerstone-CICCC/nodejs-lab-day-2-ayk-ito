"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Create your server
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error("Missing cookie keys!");
}
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [SIGN_KEY, ENCRYPT_KEY],
    maxAge: 3 * 60 * 1000,
}));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.use((0, cors_1.default)({
    origin: "http://localhost:4321", // Astro port
    credentials: true, // allow cookies
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/users", user_routes_1.default);
// 404 Fallback
app.use((req, res) => {
    res.status(404).send("Page not found!");
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});

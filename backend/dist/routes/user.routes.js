"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/", user_controller_1.default.addUser);
router.post("/login", user_controller_1.default.loginUser);
router.post("/logout", user_controller_1.default.logoutUser);
router.get("/", auth_1.checkAuth, user_controller_1.default.getUsers);
router.get("/profile", auth_1.checkAuth, user_controller_1.default.getUserProfile);
router.get("/:id", auth_1.checkAuth, user_controller_1.default.getUserById);
exports.default = router;

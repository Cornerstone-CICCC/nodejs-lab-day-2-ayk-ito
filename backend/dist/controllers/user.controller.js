"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
/**
 * Get all users
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Returns list of users.
 */
const getUsers = (req, res) => {
    const users = user_model_1.default.findAll();
    res.status(200).json(users);
};
/**
 * Get user by ID
 *
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns one user.
 */
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = user_model_1.default.findById(id);
    if (!user) {
        res.status(404).send("User not found!");
        return;
    }
    res.status(200).json(user);
};
/**
 * Add new user
 *
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns newly created user.
 */
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password || !firstname || !lastname) {
        res.status(500).json({ error: "Username/password/firstname/lastname is empty!" });
        return;
    }
    const user = yield user_model_1.default.createUser({ username, password, firstname, lastname });
    if (!user) {
        res.status(409).json({ error: "Username is taken!" });
        return;
    }
    res.status(201).json(user);
});
/**
 * Login user
 *
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} Returns cookie and redirect.
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).send("Username/password is missing!");
        return;
    }
    const user = yield user_model_1.default.checkUserPass(username, password);
    if (!user) {
        res.status(500).send("Login details are incorrect!");
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(200).send("Successfully logged in!");
});
const getUserProfile = (req, res) => {
    var _a;
    const username = (_a = req.session) === null || _a === void 0 ? void 0 : _a.username;
    const user = user_model_1.default.findByUsername(username);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    res.status(200).json(userWithoutPassword);
};
const logoutUser = (req, res) => {
    if (req.session) {
        req.session = null;
    }
    res.status(200).send("Logged out successfully");
};
exports.default = {
    getUsers,
    getUserById,
    addUser,
    loginUser,
    getUserProfile,
    logoutUser,
};

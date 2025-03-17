"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.isLoggedIn)) {
        res.status(401).send("Unauthorized");
        return;
    }
    next();
};
exports.checkAuth = checkAuth;

"use strict";
exports.__esModule = true;
exports.authenticate = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function authenticate(req, res, next) {
    var _a;
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        return res.status(401).json({ error: 'Access denied' });
    try {
        var verified = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
}
exports.authenticate = authenticate;

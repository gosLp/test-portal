"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(token);
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, "secret");
            next();
        }
        else {
            return res.status(404).json({
                message: 'Auth failed'
            });
        }
    }
    catch (err) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};
//# sourceMappingURL=checkAuth.js.map
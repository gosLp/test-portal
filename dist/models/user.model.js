"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var userType;
(function (userType) {
    userType["COMPANY"] = "company";
    userType["APPLICANT"] = "applicant";
})(userType = exports.userType || (exports.userType = {}));
const userSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    type: {
        type: [String],
        enum: userType,
        default: userType.APPLICANT,
        required: true
    }
});
const user = mongoose_1.default.model("user", userSchema);
exports.default = user;
//# sourceMappingURL=user.model.js.map
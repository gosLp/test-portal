"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuv0987654321", 6);
const companySchema = new mongoose_1.default.Schema({
    companyId: {
        type: String,
        unique: true,
        default: () => nanoid(),
        required: true
    },
    companyName: { type: String, required: true },
});
const company = mongoose_1.default.model("company", companySchema);
exports.default = company;
//# sourceMappingURL=company.model.js.map
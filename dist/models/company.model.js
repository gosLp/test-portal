"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const companySchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    companyName: { type: String },
    companyUser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    employeeCount: {
        type: Number,
        required: false,
        default: 10
    },
    companyBio: {
        type: String,
        default: "Good company"
    }
});
const company = mongoose_1.default.model("company", companySchema);
exports.default = company;
//# sourceMappingURL=company.model.js.map
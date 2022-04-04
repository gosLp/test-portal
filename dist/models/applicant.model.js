"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const applicantSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    applicantName: { type: String },
    applicantAge: { type: Number },
    applicantUser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});
const applicant = mongoose_1.default.model("applicant", applicantSchema);
exports.default = applicant;
//# sourceMappingURL=applicant.model.js.map
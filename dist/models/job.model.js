"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var JobType;
(function (JobType) {
    JobType["FULLTIME"] = "fulltime";
    JobType["INTERN"] = "internship";
    JobType["PARTTIME"] = "parttime";
    JobType["CONTRACT"] = "contract";
    JobType["VOLUNTERR"] = "volunteer";
})(JobType = exports.JobType || (exports.JobType = {}));
const jobsSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        default: "HELP REQUIRED",
    },
    jobType: {
        type: [String],
        enum: JobType,
        default: JobType.FULLTIME,
    },
    jobDesc: {
        type: String,
        default: "Help needed apply now"
    },
    company: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'company', required: true
    },
    appliedApplicants: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'applicant',
    },
});
const jobs = mongoose_1.default.model("jobs", jobsSchema);
exports.default = jobs;
//# sourceMappingURL=job.model.js.map
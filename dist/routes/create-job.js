"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const job_model_1 = __importDefault(require("../models/job.model"));
const company_model_1 = __importDefault(require("../models/company.model"));
const router = express_1.default.Router();
router.get('/all', (req, res) => {
    job_model_1.default.find()
        .exec()
        .then((doc) => {
        res.status(200).json({
            count: doc.length,
            jobs: doc.map((d) => {
                return {
                    _id: d._id,
                    title: d.title,
                    companyId: d.company,
                    goToJob: {
                        type: 'GET',
                        url: req.get('host') + '/jobs/' + d._id
                    }
                };
            })
        });
    })
        .catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});
router.post('/create', (req, res) => {
    console.log(req.body.compId);
    company_model_1.default.find({ _id: req.body.compId })
        .exec()
        .then((company) => {
        console.log(company);
        if (company[0]) {
            const newJob = new job_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId,
                jobType: req.body.jtype,
                jobDesc: req.body.jdesc,
                title: req.body.title,
                company: company[0]._id,
            });
            newJob.save().
                then((doc) => {
                console.log(doc);
                res.status(201).json({
                    message: 'Job  was Created'
                });
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
        else {
            return res.status(409).json({
                message: 'company does not exist'
            });
        }
    });
});
router.get('/:id', (req, res) => {
    job_model_1.default.findById({ _id: req.params.id })
        .exec()
        .then((doc) => {
        if (!doc) {
            return res.status(404).json({
                message: "Job was not found"
            });
        }
        res.status(200).json({
            message: "worked",
            job: doc,
            goToCompany: {
                type: 'GET',
                url: req.get('host') + '/company/' + doc.company
            }
        });
    });
});
exports.default = router;
//# sourceMappingURL=create-job.js.map
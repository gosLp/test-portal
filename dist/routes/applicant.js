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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicant_model_1 = __importDefault(require("../models/applicant.model"));
const router = express_1.default.Router();
router.post('/:id', function (req, res, next) {
    applicant_model_1.default.findById({ _id: req.params.id })
        .exec()
        .then((comp) => __awaiter(this, void 0, void 0, function* () {
        if (!comp) {
            return res.status(409).json({
                message: 'applicant doesnt exist'
            });
        }
        comp.applicantName = req.body.Name;
        comp.applicantAge = req.body.Age;
        yield comp.save();
        res.status(201).json({
            message: 'Applicant was Updated',
            applicant: comp
        });
    }));
});
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield applicant_model_1.default.find({ _id: req.params.id })
        .exec()
        .then((appl) => {
        if (!appl) {
            return res.status(409).json({
                message: 'Applicant doesnt exist'
            });
        }
        res.status(200).json({
            applicant: appl,
            message: 'Applicant '
        });
    });
}));
exports.default = router;
//# sourceMappingURL=applicant.js.map
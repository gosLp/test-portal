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
const company_model_1 = __importDefault(require("../models/company.model"));
const router = express_1.default.Router();
router.post('/:id', function (req, res, next) {
    company_model_1.default.findById({ _id: req.params.id })
        .exec()
        .then((comp) => __awaiter(this, void 0, void 0, function* () {
        if (!comp) {
            return res.status(409).json({
                message: 'Company doesnt exist'
            });
        }
        comp.companyName = req.body.Name;
        comp.companyBio = req.body.Bio;
        comp.employeeCount = req.body.eCount;
        yield comp.save();
        res.status(201).json({
            message: 'Company was Updated',
            company: comp
        });
    }));
});
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    yield company_model_1.default.find({ _id: req.params.id })
        .exec()
        .then((comp) => {
        if (!comp) {
            return res.status(409).json({
                message: 'Company doesnt exist'
            });
        }
        res.status(200).json({
            company: comp,
            message: 'Company '
        });
    });
}));
exports.default = router;
//# sourceMappingURL=company.js.map
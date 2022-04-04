"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importStar(require("../models/user.model"));
const applicant_model_1 = __importDefault(require("../models/applicant.model"));
const company_model_1 = __importDefault(require("../models/company.model"));
const router = express_1.default.Router();
router.post('/api/signup', function (req, res, next) {
    user_model_1.default.find({ email: req.body.email })
        .exec()
        .then((user) => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'user with the same mail exists'
            });
        }
        else {
            bcrypt_1.default.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    const user = new user_model_1.default({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        type: req.body.type
                    });
                    if (req.body.type === "applicant") {
                        const appli = new applicant_model_1.default({
                            _id: new mongoose_1.default.Types.ObjectId(),
                            applicantUser: user._id
                        });
                        appli.save()
                            .then((ap) => {
                            console.log(ap);
                            user.save()
                                .then((doc) => {
                                console.log(doc);
                                res.status(201).json({
                                    message: 'User was Created',
                                    applicant: ap._id
                                });
                            })
                                .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                        }).catch((err) => console.log(err));
                    }
                    else if (req.body.type === "company") {
                        const comp = new company_model_1.default({
                            _id: new mongoose_1.default.Types.ObjectId(),
                            companyUser: user._id
                        });
                        comp.save()
                            .then((comp) => {
                            console.log(comp);
                            user.save()
                                .then((doc) => {
                                console.log(doc);
                                res.status(201).json({
                                    message: 'User was Created',
                                    company: comp._id
                                });
                            })
                                .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                        }).catch((err) => console.log(err));
                    }
                }
            });
        }
    });
});
router.post('/api/login', function (req, res, next) {
    user_model_1.default.find({ email: req.body.email })
        .exec()
        .then((user) => __awaiter(this, void 0, void 0, function* () {
        if (user.length < 1) {
            return res.status(409).json({
                message: 'Auth Failed'
            });
        }
        else {
            bcrypt_1.default.compare(req.body.password, user[0].password.toString(), (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed"
                    });
                }
                if (result) {
                    if (user[0].type[0] === user_model_1.userType.APPLICANT) {
                        console.log("APPLICANT");
                        yield applicant_model_1.default.findOne({ applicantUser: user[0]._id }).exec()
                            .then((ap) => __awaiter(this, void 0, void 0, function* () {
                            return res.status(200).json({
                                message: "auth succesful",
                                applicant: ap === null || ap === void 0 ? void 0 : ap._id
                            });
                        }));
                    }
                    if (user[0].type[0] === user_model_1.userType.COMPANY) {
                        console.log("COMPANY");
                        yield company_model_1.default.findOne({ companyUser: user[0]._id }).exec()
                            .then((comp) => __awaiter(this, void 0, void 0, function* () {
                            return res.status(200).json({
                                message: "auth succesful",
                                company: comp === null || comp === void 0 ? void 0 : comp._id
                            });
                        }));
                    }
                }
                else {
                    return res.status(401).json({
                        message: "Auth Failed"
                    });
                }
            }));
        }
    }));
});
exports.default = router;
//# sourceMappingURL=user.js.map
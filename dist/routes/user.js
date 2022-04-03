"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
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
                    user.save()
                        .then((doc) => {
                        console.log(doc);
                        res.status(201).json({
                            message: 'User was Created'
                        });
                    })
                        .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
});
router.post('/api/login', function (req, res, next) {
    user_model_1.default.find({ email: req.body.email })
        .exec()
        .then((user) => {
        if (user.length < 1) {
            return res.status(409).json({
                message: 'Auth Failed'
            });
        }
        else {
            bcrypt_1.default.compare(req.body.password, user[0].password.toString(), (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed"
                    });
                }
                if (result) {
                    return res.status(200).json({
                        message: "auth succesful",
                    });
                }
                else {
                    return res.status(401).json({
                        message: "Auth Failed"
                    });
                }
            });
        }
    });
});
exports.default = router;
//# sourceMappingURL=user.js.map
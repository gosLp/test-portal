import express,{Request, Response} from "express";

import mongoose from "mongoose";
import bcrypt from 'bcrypt';


import User from "../models/user.model";

const router = express.Router();

router.post('/api/signup', function(req: Request,res: Response,next){
    User.find({email:req.body.email})
        .exec()
        .then((user) =>{
            if(user.length>=1){
                return res.status(409).json({
                    message: 'user with the same mail exists'
                });

            }
            else{

                bcrypt.hash(req.body.password,10, (err, hash)=>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            type: req.body.type
                        });
                        user.save()
                            .then( (doc)=>{
                                console.log(doc);
                                res.status(201).json({
                                    message: 'User was Created'
                                });
                            })
                            .catch((err)=>{
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
               
            }

            // res.send("it works");

        })
});

router.post('/api/login', function(req: Request,res: Response,next){
    User.find({email:req.body.email})
        .exec()
        .then((user) =>{
            if(user.length<1){
                return res.status(409).json({
                    message: 'Auth Failed'
                });

            }
            else{

                bcrypt.compare(req.body.password,user[0].password.toString(), (err, result)=>{
                    if(err){
                        return res.status(401).json({
                            message: "Auth Failed"
                        });
                    }
                    if(result){
                        return res.status(200).json({
                            message: "auth succesful",
                            // add jwt if possible for tokkkens
                        })
                    }
                    else{
                        return res.status(401).json({
                            message: "Auth Failed"
                        });
                    }
                });
               
            }

            // res.send("it works");

        })
});


export default router;
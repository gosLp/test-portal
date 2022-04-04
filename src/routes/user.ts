import express,{Request, Response} from "express";

import mongoose from "mongoose";
import bcrypt from 'bcrypt';


import User, { userType } from "../models/user.model";
import applicant from "../models/applicant.model";
import company from "../models/company.model";
import { ApplicableRefactorInfo } from "typescript";

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
                        // user.save()
                        //     .then( (doc)=>{
                        //         console.log(doc);
                        //         res.status(201).json({
                        //             message: 'User was Created'
                        //         });
                        //     })
                        //     .catch((err)=>{
                        //         console.log(err);
                        //         res.status(500).json({
                        //             error: err
                        //         });
                        //     });

                        if(req.body.type ==="applicant"){
                            const appli = new applicant({
                                _id: new mongoose.Types.ObjectId(),
                                applicantUser: user._id 
                            });
                            appli.save()
                                 .then((ap)=>{
                                     console.log(ap);
                                     user.save()
                                    .then( (doc)=>{
                                        console.log(doc);
                                        res.status(201).json({
                                            message: 'User was Created',
                                            applicant:ap._id
                                        });
                                    })
                                    .catch((err)=>{
                                        console.log(err);
                                        res.status(500).json({
                                            error: err
                                        });
                                    });
                                 }).catch((err)=>console.log(err));
                        }
                        else if(req.body.type === "company"){
                            const comp = new company(
                                {
                                    _id: new mongoose.Types.ObjectId(),
                                    companyUser: user._id
                                }
                            )
                            comp.save()
                                 .then((comp)=>{
                                     console.log(comp);
                                     user.save()
                                     .then( (doc)=>{
                                         console.log(doc);
                                         res.status(201).json({
                                             message: 'User was Created',
                                             company:comp._id
                                         });
                                     })
                                     .catch((err)=>{
                                         console.log(err);
                                         res.status(500).json({
                                             error: err
                                         });
                                     });
                                 }).catch((err)=>console.log(err));
                        }
                    }
                });
               
            }

            // res.send("it works");

        })
});

router.post('/api/login', function(req: Request,res: Response,next){

    User.find({email:req.body.email})
        .exec()
        .then(async (user) =>{
            if(user.length<1){
                return res.status(409).json({
                    message: 'Auth Failed'
                });

            }
            else{

                bcrypt.compare(req.body.password,user[0].password.toString(), async (err, result)=>{
                    if(err){
                        return res.status(401).json({
                            message: "Auth Failed"
                        });
                    }
                    if(result){
                        
                        if(user[0].type[0] === userType.APPLICANT){
                            console.log("APPLICANT");
                            await    applicant.findOne({applicantUser: user[0]._id}).exec()
                                        .then(async(ap)=>{
                                            return res.status(200).json({
                                                message: "auth succesful",
                                                applicant: ap?._id
                                                // add jwt if possible for tokkkens
                                            });
                                        })
                            
                        }
                        if(user[0].type[0] === userType.COMPANY){
                            console.log("COMPANY");
                            await    company.findOne({companyUser: user[0]._id}).exec()
                                       .then(async(comp)=>{
                                           return res.status(200).json({
                                               message: "auth succesful",
                                               company: comp?._id
                                               // add jwt if possible for tokkkens
                                           });
                                       })
                           
                       }
                        
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
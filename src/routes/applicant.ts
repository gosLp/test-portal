import express,{Request, Response} from "express";

import mongoose from "mongoose";


import User, { userType } from "../models/user.model";
import applicant from "../models/applicant.model";
import company from "../models/company.model";

const router = express.Router();
router.post('/:id', function(req: Request,res: Response,next){

         applicant.findById({_id: req.params.id})
                .exec()
                .then(async (comp)=>{
                    // console.log(comp);

                    if(!comp){
                        return res.status(409).json({
                                message: 'applicant doesnt exist'
                         });
                    }
                            comp.applicantName= req.body.Name;
                            // await comp.save();
                            comp.applicantAge= req.body.Age;
                            await comp.save();
                            // console.log(comp);
                            
                        

                            res.status(201).json({
                                message: 'Applicant was Updated',
                                applicant: comp
                            });
                  
                    
                })
   
});

router.get('/:id',async (req: Request,res: Response,next)=> {
    // console.log(req.params.id)
    await applicant.find({_id: req.params.id})
                .exec()
                .then( (appl)=>{
                    // console.log(appl);

                    if(!appl){
                        return res.status(409).json({
                                message: 'Applicant doesnt exist'
                         });
                    }
                            
                    

                            res.status(200).json({
                                applicant: appl,
                                message: 'Applicant '
                            });
                  
                    
                })
});


export default router;
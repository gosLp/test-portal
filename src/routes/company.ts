import express,{Request, Response} from "express";

import mongoose from "mongoose";


import User, { userType } from "../models/user.model";
import applicant from "../models/applicant.model";
import company from "../models/company.model";

const router = express.Router();
router.post('/:id', function(req: Request,res: Response,next){

         company.findById({_id: req.params.id})
                .exec()
                .then(async (comp)=>{
                    // console.log(comp);

                    if(!comp){
                        return res.status(409).json({
                                message: 'Company doesnt exist'
                         });
                    }
                            comp.companyName= req.body.Name;
                            comp.companyBio= req.body.Bio;
                            comp.employeeCount = req.body.eCount;
                        await comp.save();

                            res.status(201).json({
                                message: 'Company was Updated',
                                company: comp
                            });
                  
                    
                })
   
});

router.get('/:id',async (req: Request,res: Response,next)=> {
    console.log(req.params.id)
    await company.find({_id: req.params.id})
                .exec()
                .then( (comp)=>{
                    // console.log(comp);

                    if(!comp){
                        return res.status(409).json({
                                message: 'Company doesnt exist'
                         });
                    }
                            
                    

                            res.status(200).json({
                                company: comp,
                                message: 'Company '
                            });
                  
                    
                })
});


export default router;
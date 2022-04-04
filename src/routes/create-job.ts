import express,{Request, Response} from "express";

import mongoose from "mongoose";


import job from "../models/job.model";
import company from "../models/company.model";



const router = express.Router();

//Check if Applicant
router.get('/all', (req:Request, res: Response)=>{
    job.find()
        .exec()
        .then((doc)=>{
            
            res.status(200).json({
                count: doc.length,
                jobs: doc.map((d)=>{
                    
                    return{
                        _id: d._id,
                        title: d.title,
                        companyId: d.company,
                        goToJob: {
                            type: 'GET',
                            url: req.get('host')+'/jobs/'+d._id
                        }
                        // Type: d.jobType,
                        // desc: d.jobDesc,
                        // company: d.company,
                        // applied: d.appliedApplicants


                    }
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                error: err
            });
        });
});

//check if Company: Only company can post a Job

router.post('/create', (req:Request, res:Response)=>{
    console.log(req.body.compId);
    company.find({ _id: req.body.compId})
            .exec()
            .then((company)=>{
                console.log(company)
                if(company[0]){
                    const newJob = new job({
                        _id: new mongoose.Types.ObjectId,
                        jobType: req.body.jtype,
                        jobDesc: req.body.jdesc,
                        title: req.body.title,
                        company: company[0]._id,

                    });

                    newJob.save().
                            then((doc)=>{
                                console.log(doc);
                                res.status(201).json({
                                    message: 'Job  was Created'
                                });
                            })
                            .catch((err)=>{
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                }
                else{
                    return res.status(409).json({
                                message: 'company does not exist'
                            });
                }
                // else{
                //     return res.status(409).json({
                //         message: 'company with the same mail exists'
                //     });
                // }
            })
});

router.get('/:id', (req:Request, res:Response)=>{
    job.findById({_id: req.params.id})
        .exec()
        .then((doc)=>{
            if(!doc){
                return res.status(404).json({
                    message: "Job was not found"
                });
            }
            // const comp = company.findById({_id:doc.company}).exec().then((c)=>console.log(c)).catch((e)=> console.log(e));
            res.status(200).json({
                message: "worked",
                job: doc,
                goToCompany: {
                    type: 'GET',
                    url: req.get('host')+'/company/'+doc.company
                } 

            })
        })
} );

export default router;

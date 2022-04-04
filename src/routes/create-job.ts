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
                                    compId: company[0]._id,
                                    message: 'Job  was Created for Company id:' + company[0]._id
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

// apply for a particular Job with id
router.post('/apply/:id', (req:Request, res:Response)=>{
    job.findById({_id: req.params.id})
        .exec()
        .then((doc)=>{
            if(!doc){
                return res.status(404).json({
                    message: "Job was not found"
                });
            }
            console.log(req.body)
            doc.appliedApplicants.push(req.body.applicantId);
            doc.save().then(()=>{
                res.status(200).json({
                    message: "Job applied to",
                    job: doc,
                    goToCompany: {
                        type: 'GET',
                        url: req.get('host')+'/company/'+doc.company
                    } 
    
                })
            })
        })
});


// Find all the jobs the applicant applied for
router.get('/applied/:id', (req:Request, res:Response)=>{
    const jobs=[String];
    const applicantId = req.params.id;
    job.find()
        .exec()
        .then((doc)=>{
            doc.forEach(d => {
                // console.log(d);
                d.appliedApplicants.forEach(a =>{
                    console.log("hello");
                    // jobs.push(a);
                    
                    if(applicantId === a.toString()){
                        console.log(a.toString() + " applicant id matched " + applicantId);
                        jobs.push(d._id.toString());
                    }
                });
                
                
                // jobs.push(d);
                
            });
            console.log(jobs.length);
            // jobs.forEach(j=>{

            // })
            res.status(200).json({
                message: "Jobs applied to",
                applicant: applicantId,
                jobs: jobs,
                // goToCompany: {
                //     type: 'GET',
                //     url: req.get('host')+'/company/'+d.company
                // } 

            })
        }).catch((err)=>{
            console.log(err);
        })
        
});

//to check company jobs
router.get('/company/:company', (req:Request, res:Response)=>{
    job.find({"company":req.params.company})
        .exec()
        .then((doc)=>{
            return res.status(200).json({
                message: "Jobs Found",
                jobs: doc
            })
        }).catch(err =>{

            // console.log(err);
            return res.status(404).json({
                message: "Could not find Jobs ",
                error: err
            })

        })
        

})

export default router;

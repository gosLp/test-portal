import mongoose, {Document} from "mongoose";


export enum JobType {
    FULLTIME = "fulltime",
    INTERN = "internship",
    PARTTIME= "parttime",
    CONTRACT = "contract",
    VOLUNTERR = "volunteer"
}

export interface Jobs extends Document {
    title: String;
    jobType: JobType;
    jobDesc: String;
    company: mongoose.Schema.Types.ObjectId;
    appliedApplicants: [mongoose.Schema.Types.ObjectId];
    
}


const jobsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type:String,
        required: true,
        default: "HELP REQUIRED",
    },
    
    jobType: {
        type: [String],
        enum: JobType,
        default: JobType.FULLTIME,

    },
    jobDesc:{
        type: String,
        default: "Help needed apply now" 
    },
    company: {
        type: mongoose.Schema.Types.ObjectId, ref: 'company', required: true
    },
    appliedApplicants:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'applicant',
        

    },
}
);

const jobs = mongoose.model<Jobs>("jobs", jobsSchema);

export default jobs;
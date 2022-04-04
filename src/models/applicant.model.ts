import mongoose, {Document} from "mongoose";

// import {customAlphabet} from "nanoid";


// const nanoid = customAlphabet("abcdefghijklmnopqrstuv0987654321", 6);

export interface Applicant extends Document{
    applicantName: String;
    applicantAge: Number;
    applicantUser: mongoose.Types.ObjectId;
}

const applicantSchema = new mongoose.Schema({
    // companyId: {
    //     type: String,
    //     unique: true,
    //     default: () => nanoid(),
    //     required: true
    // },
    _id: mongoose.Schema.Types.ObjectId,
    applicantName: {type: String},
    applicantAge: {type:Number},
    applicantUser: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

});


const applicant = mongoose.model<Applicant>("applicant", applicantSchema);

export default applicant;
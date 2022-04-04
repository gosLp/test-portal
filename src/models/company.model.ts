import mongoose, {Document} from "mongoose";

// import {customAlphabet} from "nanoid";


// const nanoid = customAlphabet("abcdefghijklmnopqrstuv0987654321", 6);

export interface Company extends Document{
    
    companyName: String;
    companyUser: mongoose.Schema.Types.ObjectId;
    employeeCount: Number;
    companyBio: String;

}

const companySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // companyId: {
    //     type: String,
    //     unique: true,
    //     default: () => nanoid(),
    //     required: true
    // },
    companyName: {type: String},
    companyUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
   
    employeeCount: {
        type: Number,
        required: false,
        default: 10
    },
    companyBio: {
        type:String,
        default: "Good company"
    }
});


const company = mongoose.model<Company>("company", companySchema);

export default company;
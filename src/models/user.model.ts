import mongoose, {Document} from "mongoose";


export enum userType {
    COMPANY = "company",
    APPLICANT = "applicant"
}

export interface User extends Document {
    email: String,
    password: String,
    type: userType 
    
}


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    type: {
        type: [String],
        enum: userType,
        default: userType.APPLICANT,
        required: true

    }
}
);

const user = mongoose.model<User>("user", userSchema);

export default user;
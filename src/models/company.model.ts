import mongoose, {Document} from "mongoose";

import {customAlphabet} from "nanoid";


const nanoid = customAlphabet("abcdefghijklmnopqrstuv0987654321", 6);

export interface Company extends Document{
    companyId: String;
    companyName: String;
}

const companySchema = new mongoose.Schema({
    companyId: {
        type: String,
        unique: true,
        default: () => nanoid(),
        required: true
    },
    companyName: {type: String, required: true},
});


const company = mongoose.model<Company>("company", companySchema);

export default company;
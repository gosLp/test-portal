import {Request, Response, Express} from 'express'
import company from '../models/company.model';

export async function createCompany(req: Request, res: Response){
    const {companyName} = req.body;

    const newCompany = await company.create({companyName:companyName}).then().catch((err)=>{
        console.log(err);
    });

    return res.send(newCompany);
}

export default createCompany;
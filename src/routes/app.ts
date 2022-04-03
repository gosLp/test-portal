import {Express, Request ,Response} from 'express';
import { createCompany } from '../controllers/company.controller';

function routes(app: Express){
    app.get("/check", (req:Request, res:Response)=> {

        return res.send("App is healthy")
    });

    app.post('/api/company', createCompany);
}

export default routes;
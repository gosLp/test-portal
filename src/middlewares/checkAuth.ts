import jwt from 'jsonwebtoken';
import { Express, Request, Response , NextFunction} from 'express';

export default (req: Request, res: Response, next: NextFunction)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);
        if(token){
            const decoded = jwt.verify(token, "secret");
            // req.userData = decoded;
            next();

        }
        else{
            return res.status(404).json({
                message: 'Auth failed'
            })
        }
        
    }
    catch(err){
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};
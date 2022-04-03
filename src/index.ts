import express  from "express";
import  config  from "config";
import routes from "../src/routes/app";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from './routes/user'

import db from './db';




const app = express();

const port = config.get("port") as number;
app.use(cors({
    origin: config.get("corsOrigin"),
}))

app.use(bodyParser.json());

app.use('/users', userRoutes);


app.listen(port, () =>{
    console.log(`Application listening at http://localhost:${port}`);
    db();
    routes(app);
});
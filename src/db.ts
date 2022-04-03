import mongoose from "mongoose";
import config  from "config";

async function db() {
    const url = config.get("dbUrl") as string;

    try{
        await mongoose
                .connect(url)
                .then(()=>{
                    console.log(`Db is connected to ${url}`);
                });
    }
    catch(e){
        console.log(e);
    }
}

export default db;
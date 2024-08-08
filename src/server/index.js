import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
const port = 3000;
dotenv.config();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//db wipe
async function dbWipe(){
    console.log("Emptying out the database...");
    await mongoose.connection.db.dropDatabase();
    console.log("Database is now empty");
}

//db connect
async function dbConnect(){
    try
    {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected");
    }
    catch(error)
    {
        console.log(`Database connect failed. Error: \n${JSON.stringify(error)}`);
    }
}
dbConnect().then(() => dbWipe());

app.get("/databaseHealth", (req, res) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    res.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
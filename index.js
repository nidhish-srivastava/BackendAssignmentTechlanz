import express from "express"
import cors from "cors"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import { connectmongodb } from "./utils/connectToDb.js"
const port = process.env.PORT || 3000
import routes from "./routes.js"
app.use(express.json())
app.use(cors({
    credentials: true
}))
const start = async()=>{
    await connectmongodb()
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    })
}
start()

app.get("/",async(_,res)=>{
    res.status(200).json({
        message: "Server is running."
    });
})

app.use(routes)
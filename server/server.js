import cors from "cors";
import 'dotenv/config';
import express from "express";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())
await connectDB()


app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res) => res.send("API is working"))

app.listen(PORT, () => console.log("Server running on port " + PORT))
//console.log("Mongo URI:", process.env.MONGODB_URI);

//localhost:4000/api/user/register: whenever this endpoint is reached then it will execute the registeruser controller function
//same for loginuser controller functions 
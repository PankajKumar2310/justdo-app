import express from 'express'
import dotenv from 'dotenv';
import connectDB from './db/database.js';
import userRouter from './routes/user.js';
import todoRouter from './routes/todo.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import cors from "cors";


dotenv.config({});
const app= express();

// Add: trust proxy so Secure cookies work behind Render's proxy
// app.set('trust proxy', 1);

app.use(cors({
    origin:["https://justdo-app.onrender.com", "http://localhost:5173"],
    credentials: true,            
  }));


connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());



app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo',todoRouter)

const PORT = process.env.PORT || 8000;


app.listen(PORT,()=>{
    console.log(`server listen at ${PORT}`);
})




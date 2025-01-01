import express from 'express'
import cors from 'cors'

import authRouter from './routes/auth.js'

import connectToMongoDB from './db/db.js';
import noteRouter from './routes/Note.js';
import dotenv from 'dotenv';
dotenv.config();

const app =express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/note',noteRouter)


app.listen(port,()=>{
    connectToMongoDB()
    console.log(`server is running on the port ${port}`);
})
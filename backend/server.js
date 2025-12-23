const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/AuthRoutes.js");
const studentRoutes = require("./routes/StudentRoutes.js");
const { connectDB } = require('./db.js');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());

connectDB();

app.use('/',authRoutes);
app.use('/',studentRoutes);

app.listen(process.env.PORT,(error)=>{
    if(error){
        console.log("Error",error);
        return;
    }
    console.log(`Server Running on Port ${process.env.PORT}`);
});

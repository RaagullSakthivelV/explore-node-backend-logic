import express from 'express';
const PORT = process.env.PORT || 3000;
const app = express()
import {router} from './show_suggested_chargers/routes.js';


app.use('/',router)

app.listen(PORT,()=>{
    console.log("Server is running on ",PORT)
})
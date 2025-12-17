const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongooose = require('mongoose');  
const cors = require('cors');  
const app = express();
const{superAdminRouter} = require('./router/superAdmin.router');


const PORT = process.env.PORT || 2111;
mongooose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true    
}).then(() => {
    console.log('MongoDB ga ulandi');
}).catch((error) => {
    console.error('MongoDB ga ulanishda xatolik yuz berdi:', error);
});





app.use(express.json());
app.use(cors());







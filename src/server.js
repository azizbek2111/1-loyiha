const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongooose = require('mongoose');  
const cors = require('cors');  
const multer = require('multer');
const app = express();
const{superAdminRouter} = require('./router/superAdmin.router');
const {productRouter} = require('./router/product.router');



const PORT = process.env.PORT || 2111;
mongooose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true    
}).then(() => {
    console.log('MongoDB ga ulandi');
}).catch((error) => {
    console.error('MongoDB ga ulanishda xatolik yuz berdi:', error);
});
app.listen(PORT, () => {
    console.log(`Server ${PORT} portida ishga tushdi`);
});





app.use(express.json());
app.use(cors());
app.use('/superadmin', superAdminRouter);
app.use('/products', productRouter);
app.use("/images", express.static("uploads"));











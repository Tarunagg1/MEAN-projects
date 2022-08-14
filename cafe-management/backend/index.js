require('dotenv').config();
const express = require('express');
const cors = require('cors');;
require('./db/conection');

const userRoute = require('./routes/user.route');
const categoryRoute = require('./routes/category.routes');
const productRoute = require('./routes/products.route');
const billRoute = require('./routes/bill.routes');
const dashboardRoute = require('./routes/dashboard');



const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 4000;

app.use('/api/v1/user', userRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/bill', billRoute);
app.use('/api/v1/dashboard', dashboardRoute);



app.listen(PORT, function () {
    console.log('server listening on port ' + PORT);
})


const express = require('express');
const cors = require('cors');

const products_router = require('./routers/products');
const users_router = require('./routers/users');
const cart_router = require('./routers/cart');

const app = express();
app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use('/products', products_router);
app.use('/users', users_router);
app.use('/cart', cart_router);

const port = 3000
app.listen(port, () => {
    console.log('app is online');
});

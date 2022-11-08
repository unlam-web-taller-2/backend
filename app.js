const express = require('express');
const cors = require('cors');

const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');

const app = express();
app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use('/', productsRouter);
app.use('/', usersRouter);

const port = 3000
app.listen(port, () => {
    console.log('app is online');
});

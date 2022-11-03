const express = require('express');
const cors = require('cors');

const productosRouter = require('./routers/productos');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use('/', productosRouter);

const port = 3000
app.listen(port, () => {
    console.log('app is online');
});

const db = require('../db/db');

exports.productos_get = (req, res) => {
    db.get_all_products((data, err) => {
        res.setHeader('Content-Type', 'application/json');

        if (err) {
            res.status(200);
            res.send(err.message);
        } else {
            res.status(200);
            res.send(data);
        }
    });
}

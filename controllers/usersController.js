const db = require('../db/db');

exports.sign_in_post = (req, res) => {
    const f = (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const { email, password } = req.body;
        db.sign_in(email, password, (data) => {

                res.status(200);
                res.send(data);
            }, (err) => {

        res.status(400);
                res.send(err);});
    }

    setTimeout(f, 500, req, res);
}

exports.sign_up_post = (req, res) => {
    const f = (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const { email, password, name, lastname, address } = req.body;
        db.sign_up(email, password, name, lastname, address, (data) => {
            res.status(200);
            res.send(data);
        }, (err) => {
            res.status(400);
            res.send(err);
        });
    }

    setTimeout(f, 500, req, res);
}
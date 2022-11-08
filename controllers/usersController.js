exports.sign_in_post = (req, res) => {
    const f = (req, res) => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        console.log(req.body.email);
        res.send(req.body);
    }

    setTimeout(f, 2000, req, res);
}

exports.sign_up_post = (req, res) => {
    const f = (req, res) => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send('{ "login": true }');
    }

    setTimeout(f, 2000, req, res);
}
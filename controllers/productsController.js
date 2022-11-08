const http = require('https');

exports.productos_get = (req, res) => {
    const optionGet = {
        host: 'fakestoreapi.com',
        path: '/products',
        method: 'GET'
    }

    const request = http.request(optionGet, (_res) => {
        let response = ''
      
        _res.on('data', (_response) => {
            response += _response;
        })
        
        _res.on('end', () => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        })
    });

    request.on('error', (e) => {
        console.error(e.message);
    });

    request.end();
}

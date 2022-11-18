exports.success = (res, data, message) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200)
    res.send({ data: data, message: message })
}

exports.error = (res, message, code = 'error') => {
    res.setHeader('Content-Type', 'application/json')
    res.status(400)
    res.send({ message: message, code: code })
}
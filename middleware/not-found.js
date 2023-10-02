const { StatusCodes} = require('http-status-codes')

const notFound = (req, res) => {
    if(StatusCodes.NOT_FOUND){
        res.status(404).send('Route does not exist')
    }
}
module.exports = notFound

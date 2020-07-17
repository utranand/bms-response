const uuid = require('uuid')
const messagePool = require('./message')
const httpStatus = require('./httpStatus')
const lowercaseKeys = require('lowercase-keys')
const throwError = require('./throwError')
const resultObject = require('./resultObject')
const resultPaging = require('./resultPaging')
const resultSuccess = require('./resultSuccess')

module.exports = function (req, res, next) {
    //res.resly = _generateFormatters({ req, res })

    // Properties
    res.logger = _logger()
    res.httpStatus = httpStatus
    //res.customError = customError

    // Pre-defined response object
    res.throwError = _throwError({ req, res })
    //res.setLogger = _setLooger(value)
    //res.throwMessage = _throwMessage({ req, res })
    //res.resultList = _infoResult({ req, res })
    res.resultObject = _resultObject({ req, res })
    res.resultPaging = _resultPaging({ req, res })
    res.resultSuccess = _resultSuccess({ req, res })

    next()
}

let logger = undefined
const _logger = () => logger

const _setLogger = (value) => (logger = value)
module.exports.setLogger = _setLogger

// Reponse for any error
const _throwError = ({ req, res }) => {
    return ({ code, message, error }) => {
        if (!code) {
            code = res.httpStatus._500.code
        }
        if (!message) {
            message = res.httpStatus._500.message
        }
        if (logger && error) {
            //console.log(error)
            logger.error(error)
        }

        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        const result = throwError({ rqid: uuid.v4(), url: fullUrl, code, message, error })

        // Remove error display on productyion
        if (process.env.NODE_ENV !== 'development') {
            delete result['error']
        }
        res.status(result.code).json(result)
    }
}

// General result object
const _resultObject = ({ req, res }) => {
    return ({ data }) => {
        if (data === undefined || typeof data !== 'object') {
            res.throwError({ error: 'Bad result' })
            return
        }
        data = transformData(data)
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        const result = resultObject({ rqid: uuid.v4(), url: fullUrl, data })
        res.status(200).json(result)
    }
}

// Result with paging
const _resultPaging = ({ req, res }) => {
    return ({ data, paging }) => {
        if (data === undefined || typeof data !== 'object') {
            res.throwError({ error: 'Bad result' })
            return
        }
        data = transformData(data)
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        const result = resultPaging({ rqid: uuid.v4(), url: fullUrl, data, paging })
        res.status(200).json(result)
    }
}

const _resultSuccess = ({ req, res }) => {
    return () => {
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        const result = resultSuccess({ rqid: uuid.v4(), url: fullUrl })
        res.status(200).json(result)
    }
}

const transformData = (data) => {
    if (data !== undefined && data.length !== undefined) {
        data = data.map((d) => {
            return lowercaseKeys(d)
        })
    } else if (data !== undefined) {
        data = lowercaseKeys(data)
    } else {
        data = { error: 'Data is undefined' }
    }
    return data
}
// function transformData2(data) {
//     if (data !== undefined && data.length !== undefined) {
//         data = data.map((d) => {
//             return lowercaseKeys(d)
//         })
//     } else if (data !== undefined) {
//         data = lowercaseKeys(data)
//     } else {
//         throw new Error('Bad result')
//     }
//     return data
// }

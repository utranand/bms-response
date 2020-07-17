module.exports = ({ rqid = '', url = '', success = 'false', type = 'error', code = 500, message = '', error = '' }) => {
    return { rqid, url, success, type, code, message, error }
}

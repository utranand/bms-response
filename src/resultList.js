module.exports = ({ rqid = '', url = '', success = 'true', has_more, limit, ending_before, starting_after, data }) => {
    return { rqid, url, success, has_more, limit, ending_before, starting_after, data }
}

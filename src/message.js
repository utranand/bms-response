//Success
exports.Success = { code: '0000', message: 'Success', success: true, type: null }

//1000 Server Error
exports.Server_Error = { code: '1000', message: 'Server Error', success: false, type: 'error' }
exports.Route_Not_found = { code: '1001', message: "The requested Route's are not found" }

//2000 Authentication error
exports.Unauthorize = { code: '2000', message: 'Unauthorize', success: false, type: 'error' }
exports.Tokening_Fail = {
    code: '2001',
    message: 'Sign token has failed, Invalid secret key, Invalid data format',
    success: false,
    type: 'error',
}
exports.User_ID_Or_Bu_Id_Is_Empty = {
    code: '2003',
    message: 'Sign token has failed, Invalid secret key, Invalid data format',
    success: false,
    type: 'warning',
}
exports.This_User_has_no_right_to_used_system = {
    code: '2004',
    message: 'This User has no right to used system',
    success: false,
    type: 'warning',
}
exports.access_token_and_refresh_token_is_not_match = {
    code: '2005',
    message: 'access token and refresh token is not match',
    success: false,
    type: 'warning',
}
exports.EmployeeId_is_empty = { code: '2006', message: 'EmployeeId is empty.', success: false, type: 'warning' }

//9999 Undefined Error
exports.Undefined = { code: '9999', message: 'Undefined', success: false, type: 'error' }

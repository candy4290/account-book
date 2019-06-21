var jwtDecode = require('jwt-decode');


/**
 * 传入token，将其解析并返回出去
 *
 * @export
 * @param {*} _token
 * @returns
 */
export function decodeToken(_token) {
    return jwtDecode(_token);
}

/**
 * 传入token返回token过期时间的毫秒数
 *
 * @export
 * @param {*} _token
 * @returns
 */
export function getTokenExpirationDate(_token) {
    const token = decodeToken(_token);
    return token.exp
}


/**
 * 传入token返回token是否过期
 *
 * @export
 * @param {*} _token
 * @returns
 */
export function isTokenExpired(_token) {
    return (getTokenExpirationDate(_token) <= new Date() / 1000);
}
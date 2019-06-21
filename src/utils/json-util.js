
import zh from '../locales/zh-CN.json';
/**
 * 获取json数据的某个节点，返回值是string或者数组
 *
 * @export
 * @param {*} key
 */
export function getInstant(key) {
    key = 'consumeType';
    let searchTerms = []
    if (typeof(key) === 'string') {
        searchTerms = key.split('.');
    }
    const result = [];
    let temp = zh;
    searchTerms.forEach(searchItem => {
        temp = temp[searchItem];
    });
    if (typeof(temp) === 'string') {
        return temp;
    } else if (typeof(temp) === 'object') {
        for (const key in temp) {
            result.push({key: key, value: temp[key]});
        }
        return result;
    }
}


/**
 * json结构平铺
 *
 * @export
 */
export function flatJSON() {
   const tempZh = zh;
   const result = {};
   for(const key in tempZh) {
        const value = tempZh[key];
        if (typeof(value) === 'object') {
            ergodic(key, value, result);
        }
   } 
   return result;
}

function ergodic(preKey, current, result) {
    for (const key in current) {
        if (typeof(current[key]) === 'object') {
            ergodic(preKey + '.' +  key, current[key], result);
        } else {
            result[preKey + '.' +  key] = current[key];
        }
    }
}
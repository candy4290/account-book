
/**
 * 获取当前日期偏移preDay天的yyyy-MM-dd形式
 *
 * @export
 * @param {*} preDay 偏移量
 * @returns
 */
export function getDate(preDay) {
    var time = (new Date()).getTime() - preDay * 24 * 60 * 60 * 1000;
    var date = new Date(time);
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentDate = date.getFullYear() + '-' + month + '-' + strDate;
    return currentDate;
}

/**
 * 获取当前月份第dayIndex天的yyyy-MM-dd形式
 *
 * @export
 * @param {*} month 月份 yyyy-MM
 * @param {*} dayIndex 天的索引（从0开始）
 * @returns
 */
export function getDateByMonthAndIndex(month, dayIndex) {
    dayIndex++;
    if (dayIndex >= 1 && dayIndex <= 9) {
        dayIndex = "0" + dayIndex;
    }
    return month + '-' + dayIndex;
}

/**
 * 将yyyy-MM-dd形式的日期格式化为（今天，昨天，MM-dd）
 *
 * @export
 * @param {*} date yyyy-MM-dd
 * @returns
 */
export function translateDate(date) {
    if (!date) {
        return;
    }
    if (getDate(0) === date) {
        return '今天';
    } else if (getDate(1) === date) {
        return '昨天'
    } else {
        return date.slice(5);
    }
}

/**
 * 根据月份，返回该月的天数
 *
 * @export
 * @param {*} month 0-11
 * @returns
 */
export function dayNumbsOfMonth(month) {
    var curDate = new Date();
    var curMonth;
    /* 获取当前月份 */
    curMonth = month || curDate.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(curMonth + 1);
    /* 将日期设置为0 */
    curDate.setDate(0);
    /* 返回当月的天数 */
    return curDate.getDate();
}
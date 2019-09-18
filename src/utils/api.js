export default class Api {

    /**
     * 记账
     *
     * @static
     * @memberof Api
     */
    static bill = '/bill/bill';

    /**
     * 账单详情
     *
     * @static
     * @memberof Api
     */
    static billDetail = '/bill/detail';

    /**
     * 账单列表
     *
     * @static
     * @memberof Api
     */
    static billList = '/bill/billList';

    /**
     * 用户登录
     *
     * @static
     * @memberof Api
     */
    static userLogin = '/user/login';

    /**
     * 统计数据-根据月份查询
     *
     * @static
     * @memberof Api
     */
    static statisticsDataOfMonth = '/bill/statisticsDataOfMonth';

    /**
     * 统计数据-月份中每一天的收入总额、支出总额
     *
     * @static
     * @memberof Api
     */
    static statisticsDayOfMonth = '/bill/statisticsDayOfMonth';
}
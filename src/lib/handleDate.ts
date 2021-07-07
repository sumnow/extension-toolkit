
/**
 * Format Date, such as "yyyy-MM-dd hh:mm:ss"
 * @param date string or number or Date
 * @param fmt: string, "yyyy-MM-dd hh:mm:ss"
 */
function formatDate(date: string | number | Date, fmt: string = "yyyy-MM-dd hh:mm:ss"): string {
    let _date: Date
    if (date instanceof Date) {
        _date = date
    } else {
        _date = new Date(date);
    }
    interface ITime {
        [key: string]: any
        'M+': number
        'd+': number
        "h+": number
        "m+": number
        "s+": number
        "q+": number
        S: number
    }
    const o: ITime = {
        "M+": _date.getMonth() + 1, //月份
        "d+": _date.getDate(), //日
        "h+": _date.getHours(), //小时
        "m+": _date.getMinutes(), //分
        "s+": _date.getSeconds(), //秒
        "q+": Math.floor((_date.getMonth() + 3) / 3), //季度
        S: _date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ?
                o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
}

/**
 *  format Date, like '刚刚', 'xx分钟前', 'xx天前', etc. 
 * @param time string or number or date, the time you want format 
 * @param scope timestamp, exceed this time scope, automatic format time to 'yyyy-MM-dd hh:mm:ss'
 */
const timeSince = (time: string | number | Date, scope: number | undefined = undefined): string | undefined => {
    if (!time) return
    let _time: number = 0
    if (time instanceof Date) {
        _time = time.getTime()
    } else {
        _time = new Date(time).getTime()
    }
    const now = new Date().getTime()
    const min = 1000 * 60,
        h = min * 60,
        d = h * 24,
        mon = d * 30,
        y = mon * 12,
        diff = now - _time
    let num: number | string = 0,
        text = ''
    if (diff < 0) {
        console.error('Time cannot exceed current time')
        return
    }
    type TimeType = {
        _min: number,
        _max: number,
        _text: string
    };
    let array: TimeType[] = [
        {_min: 0, _max: min, _text: '刚刚'},
        {_min: min, _max: h, _text: '分钟前'},
        {_min: h, _max: d, _text: '小时前'},
        {_min: d, _max: mon, _text: '天前'},
        {_min: mon, _max: y, _text: '月前'},
        {_min: y, _max: Infinity, _text: '年前'},
    ]
    if (scope) {
        var _array = array.filter((item) => {
            return item._min <= scope
        })
        _array[_array.length - 1]._max = scope;
    }
    if (scope && diff > scope) {
        return formatDate(_time)
    } else {
        array.forEach(({_min, _max, _text}) => {
            if (_min <= diff && diff < _max) {
                if (_min !== 0) {
                    num = Math.floor(diff / _min)
                } else {
                     num = ''
                }
                text = _text
            }
        })
    }
    return `${num} ${text}`
}

export {
    formatDate,
    timeSince,
}

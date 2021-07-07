"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeSince = exports.formatDate = void 0;
function formatDate(date, fmt) {
    if (fmt === void 0) { fmt = "yyyy-MM-dd hh:mm:ss"; }
    var _date;
    if (date instanceof Date) {
        _date = date;
    }
    else {
        _date = new Date(date);
    }
    var o = {
        "M+": _date.getMonth() + 1,
        "d+": _date.getDate(),
        "h+": _date.getHours(),
        "m+": _date.getMinutes(),
        "s+": _date.getSeconds(),
        "q+": Math.floor((_date.getMonth() + 3) / 3),
        S: _date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ?
                o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
}
exports.formatDate = formatDate;
var timeSince = function (time, scope) {
    if (scope === void 0) { scope = undefined; }
    if (!time)
        return;
    var _time = 0;
    if (time instanceof Date) {
        _time = time.getTime();
    }
    else {
        _time = new Date(time).getTime();
    }
    var now = new Date().getTime();
    var min = 1000 * 60, h = min * 60, d = h * 24, mon = d * 30, y = mon * 12, diff = now - _time;
    var num = 0, text = '';
    if (diff < 0) {
        console.error('Time cannot exceed current time');
        return;
    }
    var array = [
        { _min: 0, _max: min, _text: '刚刚' },
        { _min: min, _max: h, _text: '分钟前' },
        { _min: h, _max: d, _text: '小时前' },
        { _min: d, _max: mon, _text: '天前' },
        { _min: mon, _max: y, _text: '月前' },
        { _min: y, _max: Infinity, _text: '年前' },
    ];
    if (scope) {
        var _array = array.filter(function (item) {
            return item._min <= scope;
        });
        _array[_array.length - 1]._max = scope;
    }
    if (scope && diff > scope) {
        return formatDate(_time);
    }
    else {
        array.forEach(function (_a) {
            var _min = _a._min, _max = _a._max, _text = _a._text;
            if (_min <= diff && diff < _max) {
                if (_min !== 0) {
                    num = Math.floor(diff / _min);
                }
                else {
                    num = '';
                }
                text = _text;
            }
        });
    }
    return num + " " + text;
};
exports.timeSince = timeSince;

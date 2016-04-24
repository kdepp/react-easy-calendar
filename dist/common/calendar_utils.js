'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.padding_month_dates = exports.offset_date = exports.normalize = exports.normalize_month = exports.normalize_day = exports.days_of_last_month = exports.days_of_month = exports.is_leap_year = exports.date_in_range = exports.date_list_equal = exports.date_equal = exports.compare_year = exports.compare_month = exports.compare_date = exports.compare = exports.from_system_date = exports.system_date = exports.get_weekday = exports.get_year = exports.get_month = exports.get_day = exports.make_date = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require('./utils');

var x = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var partial = x.partial;
var compose = x.compose;
var range = x.range;
var flatten = x.flatten;
var and = x.and;
var map = x.map;
var zipWith = x.zipWith;
var make_date = exports.make_date = function make_date(year, month, day) {
    return { day: day, month: month, year: year };
};
var get_day = exports.get_day = function get_day(d) {
    return d.day;
};
var get_month = exports.get_month = function get_month(d) {
    return d.month;
};
var get_year = exports.get_year = function get_year(d) {
    return d.year;
};
var get_weekday = exports.get_weekday = function get_weekday(d) {
    return system_date(d).getDay();
};
var system_date = exports.system_date = function system_date(d) {
    return new Date(get_year(d), get_month(d) - 1, get_day(d));
};
var from_system_date = exports.from_system_date = function from_system_date(d) {
    return make_date(d.getFullYear(), d.getMonth() + 1, d.getDate());
};

var compare = exports.compare = partial(function (level, a, b) {
    if (!a || !b) {
        if (!a && !b) return true;
        return false;
    }

    var helper = function helper(x, y) {
        return Math.sign(x - y);
    },
        levels = { year: 1, month: 2, day: 3 },
        end = levels[level] || 3;

    return [get_year, get_month, get_day].slice(0, end).reduce(function (prev, x) {
        return prev !== 0 ? prev : helper(x(a), x(b));
    }, 0);
});

var compare_date = exports.compare_date = compare('day');
var compare_month = exports.compare_month = compare('month');
var compare_year = exports.compare_year = compare('year');
var date_equal = exports.date_equal = function date_equal(a, b) {
    return !compare_date(a, b);
};
var date_list_equal = exports.date_list_equal = function date_list_equal(list1, list2) {
    return list1.length === list2.length && and.apply(null, map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var a = _ref2[0];
        var b = _ref2[1];
        return date_equal(a, b);
    }, zipWith(function (a, b) {
        return [a, b];
    }, list1, list2)));
};

var date_in_range = exports.date_in_range = function date_in_range(d, r) {
    var _ref3 = r || [];

    var _ref4 = _slicedToArray(_ref3, 2);

    var start = _ref4[0];
    var end = _ref4[1];


    return (start ? compare_date(start, d) <= 0 : true) && (end ? compare_date(end, d) >= 0 : true);
};

var is_leap_year = exports.is_leap_year = compose(function (year) {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}, get_year);

var days_of_month = exports.days_of_month = function days_of_month(d) {
    var m = get_month(d);

    if (!! ~[4, 6, 9, 11].indexOf(m)) return 30;else if (m == 2) return is_leap_year(d) ? 29 : 28;else return 31;
};

var days_of_last_month = exports.days_of_last_month = function days_of_last_month(d) {
    return days_of_month(normalize_month(make_date(get_year(d), get_month(d) - 1, 1)));
};

var normalize_day = exports.normalize_day = function normalize_day(d) {
    var day = get_day(d);

    if (day > days_of_month(d)) {
        return normalize_day(make_date(get_year(d), get_month(d) + 1, day - days_of_month(d)));
    } else if (day < 1) {
        return normalize_day(make_date(get_year(d), get_month(d) - 1, day + days_of_last_month(d)));
    }

    return d;
};

var normalize_month = exports.normalize_month = function normalize_month(d) {
    var month = get_month(d);

    if (month > 12) {
        return normalize_month(make_date(get_year(d) + 1, month - 12, get_day(d)));
    } else if (month < 1) {
        return normalize_month(make_date(get_year(d) - 1, month + 12, get_day(d)));
    }

    return d;
};

// Note: need to execute twice in circle, in case the change of month influences the upper bound of days
var normalize = exports.normalize = compose(normalize_month, normalize_day, normalize_month, normalize_day);

var offset_date = exports.offset_date = function offset_date(d, day_offset) {
    return normalize(make_date(get_year(d), get_month(d), get_day(d) + day_offset));
};

var padding_month_dates = exports.padding_month_dates = function padding_month_dates(d) {
    var first = make_date(get_year(d), get_month(d), 1),
        last = make_date(get_year(d), get_month(d), days_of_month(d));

    return flatten([range(0, get_weekday(first)).reverse().map(function (i) {
        return offset_date(first, -(i + 1));
    }), range(0, days_of_month(d)).map(function (i) {
        return offset_date(first, i);
    }), range(0, 6 - get_weekday(last)).map(function (i) {
        return offset_date(last, i + 1);
    })]);
};
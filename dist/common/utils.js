"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var partial = exports.partial = function partial(fn) {
    var len = fn.length,
        _arbitary = undefined;

    _arbitary = function arbitary(cur_args, left_arg_cnt) {
        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (args.length >= left_arg_cnt) {
                return fn.apply(null, cur_args.concat(args));
            }

            return _arbitary(cur_args.concat(args), left_arg_cnt - args.length);
        };
    };

    return _arbitary([], len);
};

var id = exports.id = function id(x) {
    return x;
};

var noop = exports.noop = function noop() {};

var and = exports.and = function and() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return args.reduce(function (prev, x) {
        return prev && x;
    }, true);
};

var or = exports.or = function or() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return args.reduce(function (prev, x) {
        return prev || x;
    }, false);
};

/*
 * List Operations
 */

var reduce = exports.reduce = partial(function (fn, initial, list) {
    var ret = initial;

    for (var i = 0, len = list.length; i < len; i += 1) {
        ret = fn(ret, list[i], i, list);
    }

    return ret;
});

var reduce_right = exports.reduce_right = partial(function (fn, initial, list) {
    var ret = initial;

    for (var i = list.length - 1; i >= 0; i -= 1) {
        ret = fn(list[i], ret, i, list);
    }

    return ret;
});

var map = exports.map = partial(function (fn, list) {
    return reduce(function (prev, cur, i, list) {
        return prev.push(fn(cur, i, list)), prev;
    }, [], list);
});

var zipWith = exports.zipWith = partial(function (fn) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
    }

    var len = Math.max.apply(null, args.map(function (x) {
        return x.length;
    })),
        ret = [];

    var _loop = function _loop(i) {
        ret.push(fn.apply(null, args.map(function (x) {
            return x[i];
        })));
    };

    for (var i = 0; i < len; i += 1) {
        _loop(i);
    }

    return ret;
});

var range = exports.range = function range(start, end, step_) {
    var ret = [],
        step = step_ || 1;

    for (var i = start; i < end; i += step) {
        ret.push(i);
    }

    return ret;
};

var group = exports.group = partial(function (size, list) {
    return list.reduce(function (prev, item) {
        var len = prev.length;

        if (!len || prev[len - 1].length >= size) {
            prev.push([item]);
        } else {
            prev[len - 1].push(item);
        }

        return prev;
    }, []);
});

var flatten = exports.flatten = function flatten(list) {
    return reduce(function (prev, cur) {
        return prev.concat(cur);
    }, [], list);
};

/*
 * Function Operations
 */

var compose = exports.compose = function compose() {
    for (var _len5 = arguments.length, fns = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        fns[_key5] = arguments[_key5];
    }

    return reduce_right(function (cur, prev) {
        return function (x) {
            return cur(prev(x));
        };
    }, id, fns);
};
export const partial = (fn) => {
	let len = fn.length,
		arbitary;

	arbitary = (cur_args, left_arg_cnt) => (...args) => {
		if (args.length >= left_arg_cnt) {
			return fn.apply(null, cur_args.concat(args));
		}

		return arbitary(cur_args.concat(args), left_arg_cnt - args.length);
	};

	return arbitary([], len);
};

export const id = (x) => x;

export const noop = function () {};

export const and = (...args) => args.reduce((prev, x) => prev && x, true);

export const or  = (...args) => args.reduce((prev, x) => prev || x, false);

/*
 * List Operations
 */

export const reduce = partial((fn, initial, list) => {
    let ret = initial;

    for (let i = 0, len = list.length; i < len; i += 1) {
        ret = fn(ret, list[i], i, list);
    }

    return ret;
});

export const reduce_right = partial((fn, initial, list) => {
    let ret = initial;

    for (let i = list.length - 1; i >= 0; i -= 1) {
        ret = fn(list[i], ret, i, list);
    }

    return ret;
});

export const map = partial((fn, list) => {
    return reduce((prev, cur, i, list) => {
        return (prev.push(fn(cur, i, list)), prev);
    }, [], list);
});

export const zipWith = partial((fn, ...args) => {
    let len = Math.max.apply(null, args.map(x => x.length)),
        ret = [];

    for (let i = 0; i < len; i += 1) {
        ret.push(fn.apply(null, args.map(x => x[i])));
    }

    return ret;
});

export const range = (start, end, step_) => {
    let ret = [],
        step = step_ || 1;

    for (let i = start; i < end; i += step) {
        ret.push(i);
    }

    return ret;
};

export const group = partial((size, list) => {
    return list.reduce((prev, item) => {
        let len = prev.length;

        if (!len || prev[len - 1].length >= size) {
            prev.push([item]);
        } else {
            prev[len - 1].push(item);
        }

        return prev;
    }, []);
});

export const flatten = (list) => {
    return reduce((prev, cur) => {
        return prev.concat(cur);
    }, [], list);
};

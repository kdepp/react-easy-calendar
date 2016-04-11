import * as x from './utils';

const {partial, compose, range, flatten} = x;

export const make_date         = (year, month, day) => ({day, month, year});
export const get_day           = (d) => d.day;
export const get_month         = (d) => d.month;
export const get_year          = (d) => d.year;
export const get_weekday       = (d) => system_date(d).getDay();
export const system_date       = (d) => new Date(get_year(d), get_month(d) - 1, get_day(d));
export const from_system_date  = (d) => make_date(d.getFullYear(), d.getMonth() + 1, d.getDate());

export const compare = partial((level, a, b) => {
    if (!a || !b)
        return null;

    let helper = (x, y) => Math.sign(x - y),
        levels = { year: 1, month: 2, day: 3 },
        end = levels[level] || 3;

    return [get_year, get_month, get_day].slice(0, end).reduce((prev, x) => {
        return prev !== 0 ? prev : helper(x(a), x(b));
    }, 0);
});

export const compare_date      = compare('day');
export const compare_month     = compare('month');
export const compare_year      = compare('year');
export const date_equal        = (a, b) => !compare_date(a, b);

export const date_in_range = (d, r) => {
   let [start, end] = (r || []);

   return (start ? compare_date(start, d) <= 0 : true)
       && (end   ? compare_date(end,   d) >= 0 : true);
};

export const is_leap_year = compose(
	year => year % 4 == 0 && (year % 100 != 0 || year % 400 == 0),
	get_year
);

export const days_of_month = (d) => {
	let m = get_month(d);

	if (!!~[4, 6, 9, 11].indexOf(m))
		return 30;
	else if (m == 2)
		return is_leap_year(d) ? 29 : 28;
	else
		return 31;
};

export const days_of_last_month = (d) => days_of_month(normalize_month(make_date(get_year(d), get_month(d) - 1, 1)));

export const normalize_day = (d) => {
	let day = get_day(d);

	if (day > days_of_month(d)) {
		return normalize_day(make_date(
			get_year(d),
			get_month(d) + 1,
			day - days_of_month(d)
		));
	}
	else if (day < 1) {
		return normalize_day(make_date(
			get_year(d),
			get_month(d) - 1,
			day + days_of_last_month(d)
		));
	}

	return d;
};

export const normalize_month = (d) => {
	let month = get_month(d);

	if (month > 12) {
		return normalize_month(make_date(
			get_year(d) + 1,
			month - 12,
			get_day(d)
		));
	}
	else if (month < 1) {
		return normalize_month(make_date(
			get_year(d) - 1,
			month + 12,
			get_day(d)
		));
	}

	return d;
};

export const normalize = compose(normalize_month, normalize_day);

export const offset_date = (d, day_offset) => normalize(make_date(get_year(d), get_month(d), get_day(d) + day_offset));

export const padding_month_dates = (d) => {
	let first = make_date(get_year(d), get_month(d), 1),
		last  = make_date(get_year(d), get_month(d), days_of_month(d));

	return flatten(
		range(0, get_weekday(first)).reverse()
			.map(i => offset_date(first, -(i + 1))),

		range(0, days_of_month(d))
			.map(i => offset_date(first, i)),

		range(0, 6 - get_weekday(last))
			.map(i => offset_date(last, i + 1))
	);
};

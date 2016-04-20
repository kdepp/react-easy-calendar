import {compare_date, offset_date} from './calendar_utils';

export const range_calendar_selected_range = ({selected_dates, hovered_date}) => {
    switch (selected_dates.length) {
        case 2:
            return selected_dates;

        case 1:
            return compare_date(hovered_date, selected_dates[0]) == 1 ? [...selected_dates, offset_date(hovered_date, -1)] : [];

        default:
            return [];
    }

};

export const range_calendar_selected_reducer = (prev, x) => {
    if (prev.length == 0 || prev.length >= 2) {
        return [x];
    }
    else if (prev.length == 1) {
        return compare_date(prev[0], x) == -1 ? [...prev, x] : [x];
    }
};


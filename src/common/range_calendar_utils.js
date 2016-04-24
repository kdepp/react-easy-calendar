import {compare_date, offset_date} from './calendar_utils';

export const range_calendar_selected_range = ({selectedDates, hoveredDate}) => {
    switch (selectedDates.length) {
        case 2:
            return selectedDates;

        case 1:
            return compare_date(hoveredDate, selectedDates[0]) == 1 ? [...selectedDates, offset_date(hoveredDate, -1)] : [];

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


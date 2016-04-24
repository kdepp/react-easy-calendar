'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.range_calendar_selected_reducer = exports.range_calendar_selected_range = undefined;

var _calendar_utils = require('./calendar_utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var range_calendar_selected_range = exports.range_calendar_selected_range = function range_calendar_selected_range(_ref) {
    var selectedDates = _ref.selectedDates;
    var hoveredDate = _ref.hoveredDate;

    switch (selectedDates.length) {
        case 2:
            return selectedDates;

        case 1:
            return (0, _calendar_utils.compare_date)(hoveredDate, selectedDates[0]) == 1 ? [].concat(_toConsumableArray(selectedDates), [(0, _calendar_utils.offset_date)(hoveredDate, -1)]) : [];

        default:
            return [];
    }
};

var range_calendar_selected_reducer = exports.range_calendar_selected_reducer = function range_calendar_selected_reducer(prev, x) {
    if (prev.length == 0 || prev.length >= 2) {
        return [x];
    } else if (prev.length == 1) {
        return (0, _calendar_utils.compare_date)(prev[0], x) == -1 ? [].concat(_toConsumableArray(prev), [x]) : [x];
    }
};
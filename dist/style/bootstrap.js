'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var DAY_WIDTH = 40;
var DAY_HEIGHT = 40;
var CALENDAR_WIDTH = DAY_WIDTH * 7;
var CALENDAR_GAP = 20;

var get_style = exports.get_style = function get_style(styles, classes) {
    return classes.reduce(function (prev, x) {
        return Object.assign({}, prev, styles[x]);
    }, {});
};

var calendar_styles = exports.calendar_styles = {
    calendar: {
        width: CALENDAR_WIDTH,
        fontFamily: 'helvetica'
    },
    header: {
        marginBottom: '5px',
        padding: '5px',
        borderBottom: '1px solid #ccc',
        overflow: 'hidden'
    },
    prev_month: {
        float: 'left',
        textDecoration: 'none',
        color: '#000'
    },
    next_month: {
        float: 'right',
        textDecoration: 'none',
        color: '#000'
    },
    prev_year: {
        float: 'left',
        marginRight: '15px',
        textDecoration: 'none',
        color: '#000'
    },
    next_year: {
        float: 'right',
        marginLeft: '15px',
        textDecoration: 'none',
        color: '#000'
    },
    month_title: {
        overflow: 'hidden',
        textAlign: 'center'
    },
    weeks: {
        padding: '0px',
        listStyleType: 'none'
    },
    week: {
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '0px'
    },
    day: {
        float: 'left',
        boxSizing: 'border-box',
        width: DAY_WIDTH + 'px',
        height: DAY_HEIGHT + 'px',
        lineHeight: DAY_HEIGHT + 'px',
        borderRadius: '5px',
        listStyleType: 'none',
        textAlign: 'center',
        cursor: 'pointer'
    },
    lt_month_day: {
        color: '#999'
    },
    gt_month_day: {
        color: '#999'
    },
    weekday_title: {
        fontWeight: 'bold'
    },
    selected_day: {
        color: '#ffffff',
        backgroundColor: '#285e8e',
        borderColor: '#193c5a',
        borderRadius: '5px'
    },
    ranged_day: {
        backgroundColor: '#eee',
        borderRadius: 0
    },
    banned_day: {
        backgroundColor: '#f3f3f3',
        color: '#bcbcbc',
        cursor: 'not-allowed'
    },
    hovered_day: {
        backgroundColor: '#ccc'
    },
    default_day: {
        backgroundColor: '#ffc966',
        borderColor: '#f59e00'
    },
    ok: {
        display: 'block',
        border: '1px solid black',
        borderRadius: '5px',
        textAlign: 'center'
    },
    status: {
        padding: '5px',
        overflow: 'hidden',
        borderBottom: '1px solid #ccc'
    },
    double_range: {
        width: CALENDAR_WIDTH * 2 + CALENDAR_GAP + 'px'
    }
};
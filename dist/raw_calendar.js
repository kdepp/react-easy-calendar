'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constant = require('./common/constant');

var _utils = require('./common/utils');

var x = _interopRequireWildcard(_utils);

var _calendar_utils = require('./common/calendar_utils');

var c = _interopRequireWildcard(_calendar_utils);

var _tool = require('./common/tool');

var _bootstrap = require('./style/bootstrap');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var RawCalendar = _react2.default.createClass({
    displayName: 'RawCalendar',

    propTypes: {
        // key date determines current month
        mday: _react.PropTypes.object,

        // today
        today: _react.PropTypes.object,

        // callback for state changes after mouse hover & mouse leave & click on dates
        onUpdateState: _react.PropTypes.func,

        // callback for the change of selected date
        onChange: _react.PropTypes.func,

        // a tuple of dates, selection can only be made in the valid range
        validRange: _react.PropTypes.array,

        // a list of selected dates
        selectedDates: _react.PropTypes.array,

        // internal use only, a tuple of dates to show range
        selectedRange: _react.PropTypes.array,

        // customize selected date state change
        selectedReducer: _react.PropTypes.func,

        // calendar select mode, single or multiple. It will use the default select reducer if you don't customize it.
        selectMode: _react.PropTypes.number,

        // whether to show out-of-range dates
        showOutRange: _react.PropTypes.bool,

        // customize styles
        styles: _react.PropTypes.object
    },

    getInitialState: function getInitialState() {
        return {
            selectedDates: [],
            hoveredDate: {}
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var self = this,
            props_to_state = {
            selectedDates: function selectedDates(a, b) {
                return x.and.apply(null, x.zipWith(function (x, y) {
                    return c.compare_date(x, y) === 0;
                }, a || [], b || []));
            },
            hoveredDate: function hoveredDate(a, b) {
                return c.compare_date(a, b) === 0;
            }
        };

        this.setState((0, _tool.updated_props)(props_to_state, self.props, nextProps));
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            selectedDates: this.props.selectedDates || [],
            hoveredDate: this.props.hoveredDate || {}
        });
    },

    render: function render() {
        var default_selected_reducer = function default_selected_reducer(prev, x) {
            switch (selectMode) {
                case _constant.CALENDAR_SELECT_MODE.SINGLE:
                    return [x];

                case _constant.CALENDAR_SELECT_MODE.MULTIPLE:
                    var index = prev.findIndex(function (d) {
                        return c.date_equal(d, x);
                    }),
                        copy = undefined;

                    return index == -1 ? [].concat(_toConsumableArray(prev), [x]) : (copy = [].concat(_toConsumableArray(prev)), copy.splice(index, 1), copy);

                default:
                    return prev;
            }
        };
        var self = this;
        var _self$props = self.props;
        var selectMode = _self$props.selectMode;
        var _self$props$mday = _self$props.mday;
        var mday = _self$props$mday === undefined ? c.from_system_date(new Date()) : _self$props$mday;
        var _self$props$today = _self$props.today;
        var today = _self$props$today === undefined ? c.from_system_date(new Date()) : _self$props$today;
        var _self$props$validRang = _self$props.validRange;
        var validRange = _self$props$validRang === undefined ? [] : _self$props$validRang;
        var _self$props$selectedR = _self$props.selectedRange;
        var selectedRange = _self$props$selectedR === undefined ? [] : _self$props$selectedR;
        var _self$props$onUpdateS = _self$props.onUpdateState;
        var onUpdateState = _self$props$onUpdateS === undefined ? x.noop : _self$props$onUpdateS;
        var _self$props$onChange = _self$props.onChange;
        var onChange = _self$props$onChange === undefined ? x.noop : _self$props$onChange;
        var _self$props$selectedR2 = _self$props.selectedReducer;
        var selectedReducer = _self$props$selectedR2 === undefined ? default_selected_reducer : _self$props$selectedR2;
        var _self$props$showOutRa = _self$props.showOutRange;
        var showOutRange = _self$props$showOutRa === undefined ? false : _self$props$showOutRa;
        var styles = _self$props.styles;
        var style = _self$props.style;
        var _self$state = self.state;
        var selectedDates = _self$state.selectedDates;
        var hoveredDate = _self$state.hoveredDate;
        var mark_selected = x.map(function (d) {
            var found = selectedDates.find(function (x) {
                return c.date_equal(d, x);
            });
            return (showOutRange || !d.out) && found ? _extends({}, d, { selected: true }) : d;
        });
        var mark_hovered = x.map(function (d) {
            return c.compare_date(hoveredDate, d) === 0 ? _extends({}, d, { hovered: true }) : d;
        });
        var mark_defaulted = x.map(function (d) {
            return (showOutRange || !d.out) && c.date_equal(today, d) ? _extends({}, d, { defaulted: true }) : d;
        });
        var mark_banned = x.map(function (d) {
            return c.date_in_range(d, validRange) ? d : _extends({}, d, { banned: true });
        });
        var mark_range = x.map(function (d) {
            return selectedRange.length !== 0 && (showOutRange || !d.out) && c.date_in_range(d, selectedRange) ? _extends({}, d, { ranged: true }) : d;
        });
        var mark_not_this_month = x.map(function (d) {
            return c.get_month(d) !== c.get_month(mday) ? _extends({}, d, { out: true }) : d;
        });
        var weeks = x.compose(x.group(7), mark_range, mark_selected, mark_hovered, mark_defaulted, mark_banned, mark_not_this_month, c.padding_month_dates)(mday);
        var weekday_title = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        var notify_state_change = function notify_state_change() {
            onUpdateState(self.state);
        };
        var on_click_date = function on_click_date(date) {
            return function () {
                if (date.banned) return;

                var old_selected = self.state.selectedDates,
                    new_selected = (selectedReducer || default_selected_reducer)(old_selected, date);

                self.setState({
                    selectedDates: new_selected
                }, function () {
                    notify_state_change();

                    if (!c.date_list_equal(old_selected, new_selected)) {
                        onChange(new_selected, old_selected);
                    }
                });
            };
        };
        var on_hover_date = function on_hover_date(date) {
            return function () {
                self.setState({
                    hoveredDate: date
                }, notify_state_change);
            };
        };
        var on_leave_date = function on_leave_date(date) {
            return function () {
                if (c.compare_date(date, self.state.hoveredDate) === 0) {
                    self.setState({ hoveredDate: {} }, notify_state_change);
                }
            };
        };

        styles = Object.assign({}, _bootstrap.calendar_styles, styles || {});

        return _react2.default.createElement(
            'div',
            { style: Object.assign({}, styles.calendar, style) },
            _react2.default.createElement(
                'ul',
                { style: styles.weeks },
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        'ul',
                        { style: styles.week },
                        weekday_title.map(function (t) {
                            return _react2.default.createElement(
                                'li',
                                { key: t, style: (0, _bootstrap.get_style)(styles, ['day', 'weekday_title']) },
                                t
                            );
                        })
                    )
                ),
                weeks.map(function (week) {
                    return _react2.default.createElement(
                        'li',
                        { key: JSON.stringify(week) },
                        _react2.default.createElement(
                            'ul',
                            { style: styles.week },
                            week.map(function (d) {
                                var classes = ['day', d.defaulted ? 'default_day' : '', d.hovered ? 'hovered_day' : '', d.ranged ? 'ranged_day' : '', d.selected ? 'selected_day' : '', d.banned ? 'banned_day' : '', ['lt_month_day', '', 'gt_month_day'][1 + c.compare_month(d, mday)]];

                                return _react2.default.createElement(
                                    'li',
                                    {
                                        key: JSON.stringify(d),
                                        style: (0, _bootstrap.get_style)(styles, classes),
                                        onClick: on_click_date(d),
                                        onMouseEnter: on_hover_date(d),
                                        onMouseLeave: on_leave_date(d)
                                    },
                                    c.get_day(d)
                                );
                            })
                        )
                    );
                })
            )
        );
    }
});

exports.default = RawCalendar;
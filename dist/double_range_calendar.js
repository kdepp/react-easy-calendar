'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _raw_calendar = require('./raw_calendar');

var _raw_calendar2 = _interopRequireDefault(_raw_calendar);

var _constant = require('./common/constant');

var _utils = require('./common/utils');

var x = _interopRequireWildcard(_utils);

var _calendar_utils = require('./common/calendar_utils');

var c = _interopRequireWildcard(_calendar_utils);

var _range_calendar_utils = require('./common/range_calendar_utils');

var rx = _interopRequireWildcard(_range_calendar_utils);

var _tool = require('./common/tool');

var _bootstrap = require('./style/bootstrap');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var month_tostring = function month_tostring(d) {
    return c.get_year(d) + '年' + c.get_month(d) + '月';
};

var date_tostring = function date_tostring(d) {
    return [c.get_year(d), c.get_month(d), c.get_day(d)].join('-');
};

var DoubleRangeCalendar = _react2.default.createClass({
    displayName: 'DoubleRangeCalendar',

    getInitialState: function getInitialState() {
        return {
            selectedRange: [],
            selectedDates: [],
            mday: {}
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var self = this,
            props_to_state = {
            selectedRange: function selectedRange(a, b) {
                return c.compare_date(a[0], b[0]) === 0 && c.compare_date(a[1], b[1]) === 0;
            },
            selectedDates: function selectedDates(a, b) {
                return x.and.apply(null, x.zipWith(function (x, y) {
                    return c.compare_date(x, y) === 0;
                }, a || [], b || []));
            },
            mday: function mday(a, b) {
                return c.compare_date(a, b) === 0;
            }
        };

        this.setState((0, _tool.updated_props)(props_to_state, self.props, nextProps));
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            selectedDates: this.props.selectedDates || [],
            selectedRange: rx.range_calendar_selected_range({
                selectedDates: this.props.selectedDates
            }),
            mday: this.props.mday || c.from_system_date(new Date())
        });
    },

    render: function render() {
        var self = this;
        var _self$props = self.props;
        var _self$props$onChange = _self$props.onChange;
        var onChange = _self$props$onChange === undefined ? x.noop : _self$props$onChange;
        var validRange = _self$props.validRange;
        var today = _self$props.today;
        var styles = _self$props.styles;
        var _self$state = self.state;
        var selectedRange = _self$state.selectedRange;
        var selectedDates = _self$state.selectedDates;
        var mday = _self$state.mday;
        var next_mday = c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) + 1, 1));
        var selectedReducer = rx.range_calendar_selected_reducer;
        var onUpdateState = function onUpdateState(state) {
            var selectedRange = rx.range_calendar_selected_range(state),
                old_selected = self.state.selectedDates,
                new_selected = state.selectedDates;

            self.setState(_extends({}, state, { selectedRange: selectedRange }), function () {
                (self.props.onUpdateState || x.noop)(self.state);
            });

            if (!c.date_list_equal(old_selected, new_selected)) {
                onChange(new_selected, old_selected);
            }
        };

        var common_config = {
            selectMode: _constant.CALENDAR_SELECT_MODE.MULTIPLE,
            showOutRange: false,
            selectedReducer: selectedReducer,
            selectedRange: selectedRange,
            selectedDates: selectedDates,
            onUpdateState: onUpdateState,
            validRange: validRange,
            today: today
        },
            first_config = _extends({}, common_config, {
            mday: mday,
            style: {
                float: 'left'
            }
        }),
            second_config = _extends({}, common_config, {
            mday: next_mday,
            style: {
                float: 'left',
                marginLeft: '20px'
            }
        }),
            prev_year = function prev_year() {
            self.setState({ mday: c.make_date(c.get_year(mday) - 1, c.get_month(mday), 1) });
        },
            next_year = function next_year() {
            self.setState({ mday: c.make_date(c.get_year(mday) + 1, c.get_month(mday), 1) });
        },
            prev_month = function prev_month() {
            self.setState({ mday: c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) - 1, 1)) });
        },
            next_month = function next_month() {
            self.setState({ mday: c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) + 1, 1)) });
        };

        styles = Object.assign({}, _bootstrap.calendar_styles, styles || {});

        return _react2.default.createElement(
            'div',
            { style: styles.double_range },
            _react2.default.createElement(
                'div',
                { style: styles.status },
                _react2.default.createElement(
                    'div',
                    { style: { float: 'left' } },
                    selectedDates[0] ? date_tostring(selectedDates[0]) : "",
                    ' '
                ),
                _react2.default.createElement(
                    'div',
                    { style: { float: 'right' } },
                    selectedDates[1] ? date_tostring(selectedDates[1]) : "",
                    ' '
                )
            ),
            _react2.default.createElement(
                'div',
                { style: styles.header },
                _react2.default.createElement(
                    'a',
                    { href: 'javascript: void(0)', style: styles.prev_year, onClick: prev_year },
                    '<<'
                ),
                _react2.default.createElement(
                    'a',
                    { href: 'javascript: void(0)', style: styles.prev_month, onClick: prev_month },
                    '<'
                ),
                _react2.default.createElement(
                    'a',
                    { href: 'javascript: void(0)', style: styles.next_year, onClick: next_year },
                    '>>'
                ),
                _react2.default.createElement(
                    'a',
                    { href: 'javascript: void(0)', style: styles.next_month, onClick: next_month },
                    '>'
                ),
                _react2.default.createElement(
                    'div',
                    { style: styles.month_title },
                    _react2.default.createElement(
                        'div',
                        { style: { float: 'left', marginLeft: '70px' } },
                        month_tostring(mday)
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: { float: 'right', marginRight: '70px' } },
                        month_tostring(next_mday)
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { style: { overflow: 'hidden', paddingBottom: '10px' } },
                _react2.default.createElement(_raw_calendar2.default, first_config),
                _react2.default.createElement(_raw_calendar2.default, second_config)
            )
        );
    }
});

exports.default = DoubleRangeCalendar;
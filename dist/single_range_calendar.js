'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _simple_calendar = require('./simple_calendar');

var _simple_calendar2 = _interopRequireDefault(_simple_calendar);

var _utils = require('./common/utils');

var x = _interopRequireWildcard(_utils);

var _calendar_utils = require('./common/calendar_utils');

var c = _interopRequireWildcard(_calendar_utils);

var _tool = require('./common/tool');

var _bootstrap = require('./style/bootstrap');

var _range_calendar_utils = require('./common/range_calendar_utils');

var rx = _interopRequireWildcard(_range_calendar_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleRangeCalendar = _react2.default.createClass({
    displayName: 'SingleRangeCalendar',

    getInitialState: function getInitialState() {
        return {
            selectedRange: []
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var self = this,
            props_to_state = {
            selectedRange: function selectedRange(a, b) {
                return c.compare_date(a[0], b[0]) === 0 && c.compare_date(a[1], b[1]) === 0;
            }
        };

        this.setState((0, _tool.updated_props)(props_to_state, self.props, nextProps));
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            selectedRange: rx.range_calendar_selected_range({
                selectedDates: this.props.selectedDates
            })
        });
    },

    render: function render() {
        var self = this;
        var props = self.props;
        var selectedRange = self.state.selectedRange;
        var onUpdateState = function onUpdateState(state) {
            var selectedRange = rx.range_calendar_selected_range(state);

            self.setState(_extends({}, state, { selectedRange: selectedRange }), function () {
                (props.onUpdateState || x.noop)(self.state);
            });
        };
        var selectedReducer = rx.range_calendar_selected_reducer;
        var config = _extends({}, props, {
            selectedRange: selectedRange,
            selectedReducer: selectedReducer,
            onUpdateState: onUpdateState
        });

        return _react2.default.createElement(_simple_calendar2.default, config);
    }
});

exports.default = SingleRangeCalendar;
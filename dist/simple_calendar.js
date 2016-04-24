'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _raw_calendar = require('./raw_calendar');

var _raw_calendar2 = _interopRequireDefault(_raw_calendar);

var _utils = require('./common/utils');

var x = _interopRequireWildcard(_utils);

var _calendar_utils = require('./common/calendar_utils');

var c = _interopRequireWildcard(_calendar_utils);

var _tool = require('./common/tool');

var _bootstrap = require('./style/bootstrap');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var month_tostring = function month_tostring(d) {
    return c.get_year(d) + '年' + c.get_month(d) + '月';
};

var SimpleCalendar = _react2.default.createClass({
    displayName: 'SimpleCalendar',

    getInitialState: function getInitialState() {
        return {
            mday: {}
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var self = this,
            props_to_state = {
            mday: function mday(a, b) {
                return c.compare_date(a, b) === 0;
            }
        };

        this.setState((0, _tool.updated_props)(props_to_state, self.props, nextProps));
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            mday: this.props.mday || c.from_system_date(new Date())
        });
    },

    render: function render() {
        var self = this;
        var props = self.props;
        var _props = props;
        var styles = _props.styles;
        var mday = self.state.mday;
        var prev_month = function prev_month() {
            self.setState({ mday: c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) - 1, 1)) });
        };
        var next_month = function next_month() {
            self.setState({ mday: c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) + 1, 1)) });
        };

        styles = Object.assign({}, _bootstrap.calendar_styles, styles || {});
        props = Object.assign({}, props, { mday: self.state.mday || self.props.mday });

        return _react2.default.createElement(
            'div',
            { style: styles.calendar },
            _react2.default.createElement(
                'div',
                { style: styles.header },
                _react2.default.createElement(
                    'a',
                    { href: 'javascript: void(0)', style: styles.prev_month, onClick: prev_month },
                    '<'
                ),
                _react2.default.createElement(
                    'a',
                    { href: 'javascript: void(0)', style: styles.next_month, onClick: next_month },
                    '>'
                ),
                _react2.default.createElement(
                    'div',
                    { style: styles.month_title },
                    month_tostring(mday)
                )
            ),
            _react2.default.createElement(_raw_calendar2.default, props)
        );
    }
});

exports.default = SimpleCalendar;
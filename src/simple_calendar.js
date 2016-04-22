import React, {Component, PropTypes} from 'react';

import RawCalendar from './raw_calendar';
import * as x from './common/utils';
import * as c from './common/calendar_utils';
import {updated_props} from './common/tool';
import {get_style, calendar_styles} from './style/bootstrap';

const month_tostring = (d) => c.get_year(d) + '年' + c.get_month(d) + '月';

const SimpleCalendar = React.createClass({
    getInitialState: function () {
        return {
            mday: {}
        };
    },

    componentWillReceiveProps: function (nextProps) {
        let self = this,
            props_to_state = {
                mday: (a, b) => c.compare_date(a, b) === 0
            };

        this.setState(updated_props(props_to_state, self.props, nextProps));
    },

    componentDidMount: function () {
        this.setState({
            mday: this.props.mday || {}
        });
    },

    render: function () {
        let self = this,
            props = self.props,
            {styles} = props,
            {mday} = self.state,
            prev_month = () => {
                self.setState({mday: c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) - 1 , 1))});
            },
            next_month = () => {
                self.setState({mday: c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) + 1 , 1))});
            };

        styles = Object.assign({}, calendar_styles, styles || {});
        props  = Object.assign({}, props, {mday: self.state.mday || self.props.mday});

        return (
            <div style={styles.calendar}>
                <div style={styles.header}>
                    <a href='javascript: void(0)' style={styles.prev_month} onClick={prev_month}>&lt;</a>
                    <a href='javascript: void(0)' style={styles.next_month} onClick={next_month}>&gt;</a>
                    <div style={styles.month_title}>{month_tostring(mday)}</div>
                </div>
                <RawCalendar {...props} />
            </div>
        );
    }
});

export default SimpleCalendar;

import React, {Component, PropTypes} from 'react';

import RawCalendar from './raw_calendar';
import * as x from './common/utils';
import * as c from './common/calendar_utils';
import {updated_props} from './common/tool';
import {get_style, calendar_styles} from './common/style';

const month_tostring = (d) => c.get_year(d) + '年' + c.get_month(d) + '月';

const SimpleCalendar = React.createClass({
	getInitialState: function () {
		return {
            key_date: {}
		};
	},

    componentWillReceiveProps: function (nextProps) {
        let self = this,
            props_to_state = {
                key_date: (a, b) => c.compare_date(a, b) === 0
            };

        this.setState(updated_props(props_to_state, self.props, nextProps));
    },

	componentDidMount: function () {
		this.setState({
			key_date: this.props.key_date || {}
		});
	},

    render: function () {
        let self = this,
            props = self.props,
            {styles} = props,
            {key_date} = self.state,
			prev_month = () => {
				self.setState({key_date: c.normalize_month(c.make_date(c.get_year(key_date), c.get_month(key_date) - 1 , 1))});
			},
			next_month = () => {
				self.setState({key_date: c.normalize_month(c.make_date(c.get_year(key_date), c.get_month(key_date) + 1 , 1))});
			};

        styles = Object.assign({}, calendar_styles, styles || {});
        props  = Object.assign({}, props, {key_date: self.state.key_date || self.props.key_date});

        return (
            <div style={styles.calendar}>
				<div style={styles.header}>
					<a href='javascript: void(0)' style={styles.prev_month} onClick={prev_month}>&lt;</a>
					<a href='javascript: void(0)' style={styles.next_month} onClick={next_month}>&gt;</a>
					<div style={styles.month_title}>{month_tostring(key_date)}</div>
				</div>
                <RawCalendar {...props} />
            </div>
        );
    }
});

export default SimpleCalendar;

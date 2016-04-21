import React, {Component, PropTypes} from 'react';

import RawCalendar from './raw_calendar';
import {CALENDAR_MODE} from './common/constant';
import * as x from './common/utils';
import * as c from './common/calendar_utils';
import * as rx from './common/range_calendar_utils';
import {updated_props} from './common/tool';
import {get_style, calendar_styles} from './common/style';


const month_tostring = (d) => c.get_year(d) + '年' + c.get_month(d) + '月';

const date_tostring = (d) => [c.get_year(d), c.get_month(d), c.get_day(d)].join('-');

const DoubleRangeCalendar = React.createClass({
	getInitialState: function () {
		return {
            selected_range: [],
            selected_dates: [],
            key_date: {}
		};
	},

    componentWillReceiveProps: function (nextProps) {
        let self = this,
            props_to_state = {
                selected_range: (a, b) => c.compare_date(a[0], b[0]) === 0 && c.compare_date(a[1], b[1]) === 0,
                selected_dates: (a, b) => x.and.apply(null, x.zipWith((x, y) => c.compare_date(x, y) === 0, a || [], b || [])),
                key_date: (a, b) => c.compare_date(a, b) === 0
            };

        this.setState(updated_props(props_to_state, self.props, nextProps));
    },

	componentDidMount: function () {
		this.setState({
			selected_range: this.props.selected_range || [],
			selected_dates: this.props.selected_dates || [],
			key_date: this.props.key_date || {}
		});
	},

    render: function () {
        let self = this,
            {
                on_update,
                valid_range,
                default_date,
                styles
            } = self.props,
            {
                selected_range,
                selected_dates,
                key_date
            } = self.state,
            next_key_date    = c.normalize_month(c.make_date(c.get_year(key_date), c.get_month(key_date) + 1 , 1)),
            selected_reducer = rx.range_calendar_selected_reducer,
            on_update_state  = (state) => {
                let selected_range = rx.range_calendar_selected_range(state);   

                self.setState({ ...state, selected_range }, () => {
                    (self.props.on_update_state || x.noop)(self.state);
                });
            };

        let common_config = {
                calendar_mode: CALENDAR_MODE.MULTIPLE,
                show_out_range: false,
                selected_reducer,
                selected_range,
                selected_dates,
                on_update_state,
                valid_range,
                default_date
            },
            first_config = {
                ...common_config,
                selected_dates,
                key_date,
                style: {
                    float: 'left'
                }
            },
            second_config = {
                ...common_config,
                selected_dates,
                key_date:  next_key_date,
                style: {
                    float: 'left',
                    marginLeft: '20px'
                }
            },
            prev_year = () => {
				self.setState({key_date: c.make_date(c.get_year(key_date) - 1, c.get_month(key_date) , 1)});
            },
            next_year = () => {
				self.setState({key_date: c.make_date(c.get_year(key_date) + 1, c.get_month(key_date) , 1)});
            },
            prev_month = () => {
				self.setState({key_date: c.normalize_month(c.make_date(c.get_year(key_date), c.get_month(key_date) - 1 , 1))});
            },
            next_month = () => {
				self.setState({key_date: c.normalize_month(c.make_date(c.get_year(key_date), c.get_month(key_date) + 1 , 1))});
            };

        styles = Object.assign({}, calendar_styles, styles || {});

        return (
            <div style={{ width: '625px' }}>
                <div style={styles.status}>
                    <div style={{float: 'left'}}>
                        {selected_dates[0] ? date_tostring(selected_dates[0]) : ""}&nbsp;
                    </div>
                    <div style={{float: 'right'}}>
                        {selected_dates[1] ? date_tostring(selected_dates[1]) : ""}&nbsp;
                    </div>
                </div>
				<div style={styles.header}>
					<a href='javascript: void(0)' style={styles.prev_year} onClick={prev_year}>&lt;&lt;</a>
					<a href='javascript: void(0)' style={styles.prev_month} onClick={prev_month}>&lt;</a>
					<a href='javascript: void(0)' style={styles.next_year} onClick={next_year}>&gt;&gt;</a>
					<a href='javascript: void(0)' style={styles.next_month} onClick={next_month}>&gt;</a>
					<div style={styles.month_title}>
                        <div style={{float: 'left', marginLeft: '70px'}}>
                            {month_tostring(key_date)}
                        </div>
                        <div style={{float: 'right', marginRight: '70px'}}>
                            {month_tostring(next_key_date)}
                        </div>
                    </div>
				</div>
                <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
                    <RawCalendar {...first_config}  />
                    <RawCalendar {...second_config} />
                </div>
            </div>
        );
    }
});

export default DoubleRangeCalendar;

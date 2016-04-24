import React, {Component, PropTypes} from 'react';

import RawCalendar from './raw_calendar';
import {CALENDAR_SELECT_MODE} from './common/constant';
import * as x from './common/utils';
import * as c from './common/calendar_utils';
import * as rx from './common/range_calendar_utils';
import {updated_props} from './common/tool';
import {get_style, calendar_styles} from './style/bootstrap';


const month_tostring = (d) => c.get_year(d) + '年' + c.get_month(d) + '月';

const date_tostring = (d) => [c.get_year(d), c.get_month(d), c.get_day(d)].join('-');

const DoubleRangeCalendar = React.createClass({
    getInitialState: function () {
        return {
            selectedRange: [],
            selected_dates: [],
            mday: {}
        };
    },

    componentWillReceiveProps: function (nextProps) {
        let self = this,
            props_to_state = {
                selectedRange: (a, b) => c.compare_date(a[0], b[0]) === 0 && c.compare_date(a[1], b[1]) === 0,
                selected_dates: (a, b) => x.and.apply(null, x.zipWith((x, y) => c.compare_date(x, y) === 0, a || [], b || [])),
                mday: (a, b) => c.compare_date(a, b) === 0
            };

        this.setState(updated_props(props_to_state, self.props, nextProps));
    },

    componentDidMount: function () {
        this.setState({
            selectedRange: this.props.selectedRange || [],
            selected_dates: this.props.selected_dates || [],
            mday: this.props.mday || c.from_system_date(new Date)
        });
    },

    render: function () {
        let self = this,
            {
                onChange = x.noop,
                validRange,
                today,
                styles
            } = self.props,
            {
                selectedRange,
                selected_dates,
                mday
            } = self.state,
            next_mday    = c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) + 1 , 1)),
            selectedReducer = rx.range_calendar_selected_reducer,
            onUpdateState  = (state) => {
                let selectedRange = rx.range_calendar_selected_range(state),
                    old_selected = self.state.selected_dates,
                    new_selected = state.selected_dates;

                self.setState({ ...state, selectedRange }, () => {
                    (self.props.onUpdateState || x.noop)(self.state);
                });

                if (!c.date_list_equal(old_selected, new_selected)) {
                    onChange(new_selected, old_selected);
                }
            };

        let common_config = {
                selectMode: CALENDAR_SELECT_MODE.MULTIPLE,
                showOutRange: false,
                selectedReducer,
                selectedRange,
                selected_dates,
                onUpdateState,
                validRange,
                today
            },
            first_config = {
                ...common_config,
                mday,
                style: {
                    float: 'left'
                }
            },
            second_config = {
                ...common_config,
                mday:  next_mday,
                style: {
                    float: 'left',
                    marginLeft: '20px'
                }
            },
            prev_year = () => {
                self.setState({mday: c.make_date(c.get_year(mday) - 1, c.get_month(mday) , 1)});
            },
            next_year = () => {
                self.setState({mday: c.make_date(c.get_year(mday) + 1, c.get_month(mday) , 1)});
            },
            prev_month = () => {
                self.setState({mday: c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) - 1 , 1))});
            },
            next_month = () => {
                self.setState({mday: c.normalize_month(c.make_date(c.get_year(mday), c.get_month(mday) + 1 , 1))});
            };

        styles = Object.assign({}, calendar_styles, styles || {});

        return (
            <div style={styles.double_range}>
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
                            {month_tostring(mday)}
                        </div>
                        <div style={{float: 'right', marginRight: '70px'}}>
                            {month_tostring(next_mday)}
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

import React, {Component, PropTypes} from 'react';

import {CALENDAR_SELECT_MODE} from './common/constant';
import * as x from './common/utils';
import * as c from './common/calendar_utils';
import {updated_props} from './common/tool';
import {get_style, calendar_styles} from './style/bootstrap';

const RawCalendar = React.createClass({
    propTypes: {
        // key date determines current month
        mday: PropTypes.object,

        // today
        today: PropTypes.object,

        // callback for state changes after mouse hover & mouse leave & click on dates
        onUpdateState: PropTypes.func,

        // callback for the change of selected date 
        onChange: PropTypes.func,

        // a tuple of dates, selection can only be made in the valid range
        validRange: PropTypes.array,

        // a list of selected dates
        selectedDates: PropTypes.array,

        // a tuple of dates to show range
        selectedRange: PropTypes.array,

        // customize selected date state change
        selectedReducer: PropTypes.func,

        // calendar select mode, single or multiple. It will use the default select reducer if you don't customize it.
        selectMode: PropTypes.number,

        // whether to show out-of-range dates
        showOutRange: PropTypes.bool,

        // customize styles
        styles: PropTypes.object
    },

    getInitialState: function () {
        return {
            selectedDates: [],
            hoveredDate: {}
        };
    },

    componentWillReceiveProps: function (nextProps) {
        let self = this,
            props_to_state = {
                selectedDates: (a, b) => x.and.apply(null, x.zipWith((x, y) => c.compare_date(x, y) === 0, a || [], b || [])),
                hoveredDate: (a, b) => c.compare_date(a, b) === 0
            };

        this.setState(updated_props(props_to_state, self.props, nextProps));
    },

    componentDidMount: function () {
        this.setState({
            selectedDates: this.props.selectedDates || [],
            hoveredDate: this.props.hoveredDate || {}
        });
    },

    render: function () {
        let default_selected_reducer = (prev, x) => {
                switch (selectMode) {
                    case CALENDAR_SELECT_MODE.SINGLE:
                        return [x];

                    case CALENDAR_SELECT_MODE.MULTIPLE:
                        let index = prev.findIndex(d => c.date_equal(d, x)),
                            copy;

                        return index == -1 ? [...prev, x] : (copy = [...prev], copy.splice(index, 1), copy);

                    default:
                        return prev;
                }
            },
            self = this,
            {
                selectMode,
                mday  = c.from_system_date(new Date),
                today = c.from_system_date(new Date),
                validRange = [],
                selectedRange = [],
                onUpdateState = x.noop,
                onChange = x.noop,
                selectedReducer = default_selected_reducer,
                showOutRange = false,
                styles,
                style
            } = self.props,
            {
                selectedDates,
                hoveredDate
            } = self.state,
            mark_selected = x.map(d => {
                let found = selectedDates.find(x => c.date_equal(d, x));
                return (showOutRange || !d.out) && found ? {...d, selected: true} : d;
            }),
            mark_hovered = x.map(d => {
                return c.compare_date(hoveredDate, d) === 0 ? {...d, hovered: true} : d;
            }),
            mark_defaulted = x.map(d => {
                return (showOutRange || !d.out) && c.date_equal(today, d) ? {...d, defaulted: true} : d;
            }),
            mark_banned = x.map(d => {
                return c.date_in_range(d, validRange) ? d : {...d, banned: true};
            }),
            mark_range = x.map(d => {
                return selectedRange.length !== 0 && (showOutRange || !d.out) && c.date_in_range(d, selectedRange) ? {...d, ranged: true} : d;
            }),
            mark_not_this_month = x.map(d => {
                return c.get_month(d) !== c.get_month(mday) ? {...d, out: true} : d;
            }),
            weeks = x.compose(
                x.group(7),
                mark_range,
                mark_selected,
                mark_hovered,
                mark_defaulted,
                mark_banned,
                mark_not_this_month,
                c.padding_month_dates
            )(mday),
            weekday_title = [
                'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'
            ],
            notify_state_change = () => {
                onUpdateState(self.state);
            },
            on_click_date = (date) => () => {
                if (date.banned)    return;

                let old_selected = self.state.selectedDates,
                    new_selected = (selectedReducer || default_selected_reducer)(old_selected, date);

                self.setState({
                    selectedDates: new_selected
                }, () => {
                    notify_state_change();

                    if (!c.date_list_equal(old_selected, new_selected)) {
                        onChange(new_selected, old_selected);
                    }
                });
            },
            on_hover_date = (date) => () => {
                self.setState({
                    hoveredDate: date
                }, notify_state_change);
            },
            on_leave_date = (date) => () => {
                if (c.compare_date(date, self.state.hoveredDate) === 0) {
                    self.setState({hoveredDate: {}}, notify_state_change);
                }
            };

        styles = Object.assign({}, calendar_styles, styles || {});

        return (
            <div style={Object.assign({}, styles.calendar, style)}>
                <ul style={styles.weeks}>
                    <li>
                        <ul style={styles.week}>
                        {weekday_title.map(t => {
                            return (
                                <li key={t} style={get_style(styles, ['day', 'weekday_title'])} >{t}</li>
                            );
                        })}
                        </ul>
                    </li>
                    {weeks.map(week => {
                    return (
                        <li key={JSON.stringify(week)}>
                            <ul style={styles.week}>
                            {week.map(d => {
                                let classes = [
                                    'day',
                                    d.defaulted ? 'default_day' : '',
                                    d.hovered   ? 'hovered_day' : '',
                                    d.ranged    ? 'ranged_day' : '',
                                    d.selected  ? 'selected_day' : '',
                                    d.banned    ? 'banned_day' : '',
                                    ['lt_month_day', '', 'gt_month_day'][1 + c.compare_month(d, mday)]
                                ];

                                return (
                                    <li
                                        key={JSON.stringify(d)}
                                        style={get_style(styles, classes)}
                                        onClick={on_click_date(d)}
                                        onMouseEnter={on_hover_date(d)}
                                        onMouseLeave={on_leave_date(d)}
                                    >{c.get_day(d)}</li>
                                )
                            })}
                            </ul>
                        </li>
                    )
                    })}
                </ul>
            </div>
        );
    }
});

export default RawCalendar;

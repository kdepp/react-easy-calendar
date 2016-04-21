import React, {Component, PropTypes} from 'react';

import {CALENDAR_MODE} from './common/constant';
import * as x from './common/utils';
import * as c from './common/calendar_utils';
import {updated_props} from './common/tool';
import {get_style, calendar_styles} from './common/style';

const RawCalendar = React.createClass({
    propTypes: {
        // calendar select mode, single or multiple
        calendar_mode: PropTypes.number.isRequired,

        // key date determines current month
        key_date: PropTypes.object.isRequired,

        // today
        default_date: PropTypes.object.isRequired,

        // a tuple of dates, selection can only be made in the valid range
        valid_range: PropTypes.array,

        // a tuple of selected dates
        selected_range: PropTypes.array,

        // callback for state changes after mouse hover & mouse leave & click on dates
        on_update_state: PropTypes.func.isRequired,

        // customize selected date state change
        selected_reducer: PropTypes.func,

        // whether to show out-of-range dates
        show_out_range: PropTypes.bool,

        // customize styles
        styles: PropTypes.object
    },

	getInitialState: function () {
		return {
			selected_dates: [],
            hovered_date: {}
		};
	},

    componentWillReceiveProps: function (nextProps) {
        let self = this,
            props_to_state = {
                selected_dates: (a, b) => x.and.apply(null, x.zipWith((x, y) => c.compare_date(x, y) === 0, a || [], b || [])),
                hovered_date: (a, b) => c.compare_date(a, b) === 0
            };

        this.setState(updated_props(props_to_state, self.props, nextProps));
    },

	componentDidMount: function () {
		this.setState({
			selected_dates: this.props.selected_dates || [],
			hovered_date: this.props.hovered_date || {}
		});
	},

	render: function () {
		let self = this,
			{
                calendar_mode,
                key_date,
                default_date,
                valid_range,
                selected_range,
                on_update_state,
                selected_reducer,
                show_out_range,
                styles,
                style
            } = self.props,
			{
                selected_dates,
                hovered_date
            } = self.state,
            _default_date = default_date || c.from_system_date(new Date),
			mark_selected = x.map(d => {
				let found = selected_dates.find(x => c.date_equal(d, x));
				return (show_out_range || !d.out) && found ? {...d, selected: true} : d;
			}),
            mark_hovered = x.map(d => {
				return c.compare_date(hovered_date, d) === 0 ? {...d, hovered: true} : d;
            }),
			mark_defaulted = x.map(d => {
				return (show_out_range || !d.out) && c.date_equal(_default_date, d) ? {...d, defaulted: true} : d;
			}),
            mark_banned = x.map(d => {
                return c.date_in_range(d, valid_range) ? d : {...d, banned: true};
            }),
            mark_range = x.map(d => {
                return (selected_range || []).length !== 0 && (show_out_range || !d.out) && c.date_in_range(d, selected_range) ? {...d, ranged: true} : d;
            }),
            mark_not_this_month = x.map(d => {
                return c.get_month(d) !== c.get_month(key_date) ? {...d, out: true} : d;
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
			)(key_date),
			weekday_title = [
                'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'
            ],
            default_selected_reducer = (prev, x) => {
				switch (calendar_mode) {
					case CALENDAR_MODE.SINGLE:
                        return [x];

					case CALENDAR_MODE.MULTIPLE:
						let index = prev.findIndex(d => c.date_equal(d, x));
                        return index == -1 ? [...prev, x] : (prev.splice(index, 1), prev);

                    default:
                        return prev;
				}
            },
            notify_state_change = () => {
                (on_update_state || noop)(self.state);
            },
			on_click_date = (date) => () => {
                if (date.banned)    return;

                self.setState({
                    selected_dates: (selected_reducer || default_selected_reducer)(self.state.selected_dates, date)
                }, notify_state_change);
			},
            on_hover_date = (date) => () => {
                self.setState({
                    hovered_date: date
                }, notify_state_change);
            },
            on_leave_date = (date) => () => {
                if (c.compare_date(date, self.state.hovered_date) === 0) {
                    self.setState({hovered_date: {}}, notify_state_change);
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
								<li key={t} style={get_style(styles, ['day', 'weekday_title'])}>{t}</li>
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
                                    ['lt_month_day', '', 'gt_month_day'][1 + c.compare_month(d, key_date)]
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

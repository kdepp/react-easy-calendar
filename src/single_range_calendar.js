import React, {Component, PropTypes} from 'react';

import SimpleCalendar from './simple_calendar';
import * as x from './common/utils';
import * as c from './common/calendar_utils';
import {updated_props} from './common/tool';
import {get_style, calendar_styles} from './common/style';
import * as rx from './common/range_calendar_utils';


const SingleRangeCalendar = React.createClass({
	getInitialState: function () {
		return {
            selected_range: []
		};
	},

    componentWillReceiveProps: function (nextProps) {
        let self = this,
            props_to_state = {
                selected_range: (a, b) => c.compare_date(a[0], b[0]) === 0 && c.compare_date(a[1], b[1]) === 0
            };

        this.setState(updated_props(props_to_state, self.props, nextProps));
    },

	componentDidMount: function () {
		this.setState({
			selected_range: this.props.selected_range || []
		});
	},

    render: function () {
        let self = this,
            props = self.props,
            {selected_range} = self.state,
            on_update_state  = (state) => {
                let selected_range = rx.range_calendar_selected_range(state);   

                self.setState({ ...state, selected_range }, () => {
                    (props.on_update_state || x.noop)(self.state);
                });
            },
            selected_reducer = rx.range_calendar_selected_reducer,
            config = {
                ...props,
                selected_range,
                selected_reducer,
                on_update_state
            };

        return (
            <SimpleCalendar {...config} />
        );
    }
});

export default SingleRangeCalendar;
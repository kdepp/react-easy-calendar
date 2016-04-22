import React, {Component, PropTypes} from 'react';

import SimpleCalendar from './simple_calendar';
import * as x from './common/utils';
import * as c from './common/calendar_utils';
import {updated_props} from './common/tool';
import {get_style, calendar_styles} from './style/bootstrap';
import * as rx from './common/range_calendar_utils';


const SingleRangeCalendar = React.createClass({
    getInitialState: function () {
        return {
            selectedRange: []
        };
    },

    componentWillReceiveProps: function (nextProps) {
        let self = this,
            props_to_state = {
                selectedRange: (a, b) => c.compare_date(a[0], b[0]) === 0 && c.compare_date(a[1], b[1]) === 0
            };

        this.setState(updated_props(props_to_state, self.props, nextProps));
    },

    componentDidMount: function () {
        this.setState({
            selectedRange: this.props.selectedRange || []
        });
    },

    render: function () {
        let self = this,
            props = self.props,
            {selectedRange} = self.state,
            onUpdateState  = (state) => {
                let selectedRange = rx.range_calendar_selected_range(state);   

                self.setState({ ...state, selectedRange }, () => {
                    (props.onUpdateState || x.noop)(self.state);
                });
            },
            selectedReducer = rx.range_calendar_selected_reducer,
            config = {
                ...props,
                selectedRange,
                selectedReducer,
                onUpdateState
            };

        return (
            <SimpleCalendar {...config} />
        );
    }
});

export default SingleRangeCalendar;

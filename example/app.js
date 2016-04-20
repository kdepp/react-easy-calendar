import React, {Component} from 'react';
import {render} from 'react-dom';

import * as c from '../src/common/calendar_utils';
import RawCalendar from '../src/raw_calendar';
import SimpleCalendar from '../src/simple_calendar';
import SingleRangeCalendar from '../src/single_range_calendar';
import DoubleRangeCalendar from '../src/double_range_calendar';

let raw_calendar_config = {
    calendar_mode: 0,
    show_out_range: false,
    key_date: c.from_system_date(new Date),
    default_date: c.from_system_date(new Date),
    on_update_state: (state) => {
        console.log(state);
    },
    on_ok: (...args) => {
        console.log(args);
        debugger
    },
};

let single_range_config = {
    ...raw_calendar_config,
    show_out_range: true
};

render((
    <div>
        <div>
            <h3>Raw Calendar</h3>
            <RawCalendar {...raw_calendar_config} />
        </div>

        <div>
            <h3>Simple Calendar</h3>
            <SimpleCalendar {...raw_calendar_config} />
        </div>

        <div>
            <h3>Single Range Calendar</h3>
            <SingleRangeCalendar {...single_range_config} />
        </div>

        <div>
            <h3>Double Range Calendar</h3>
            <DoubleRangeCalendar {...raw_calendar_config} />
        </div>
    </div>
), document.getElementById('app_root'));

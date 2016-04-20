import React, {Component} from 'react';
import {render} from 'react-dom';

import * as c from '../src/common/calendar_utils';
import RawCalendar from '../src/raw_calendar';

let raw_calendar_config = {
    calendar_mode: 1,
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

render((
    <div>
        <h3>Raw Calendar</h3>
        <RawCalendar {...raw_calendar_config} />
    </div>
), document.getElementById('app_root'));

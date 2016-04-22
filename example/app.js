import React, {Component} from 'react';
import {render} from 'react-dom';

import {RawCalendar, SimpleCalendar, SingleRangeCalendar, DoubleRangeCalendar, utils as c} from '../src/index';

let raw_calendar_config = {
    selectMode: 0,
    showOutRange: false,
    mday: c.from_system_date(new Date),
    today: c.from_system_date(new Date),
    onUpdateState: (state) => {
        console.log(state);
    }
};

let single_range_config = {
    ...raw_calendar_config,
    showOutRange: true
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

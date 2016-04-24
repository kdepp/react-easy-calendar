import React, {Component} from 'react';
import {render} from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco as style } from 'react-syntax-highlighter/dist/styles';

import {RawCalendar, SimpleCalendar, SingleRangeCalendar, DoubleRangeCalendar, utils} from '../src/index';

let styles = {
    title: {
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        color: '#333',
        background: '#eee',
        lineHeight: '40px',
        padding: '0 0 0 20px'
    },
    one: {
        overflow: 'hidden'
    },
    demo: {
        float: 'left',
        width: '400px'
    },
    code: {
        float: 'left',
        width: '700px'
    }
};


let code_1 =
`import React, {Component} from 'react';
import {render} from 'react-dom';
import {SimpleCalendar, utils} from 'react-easy-calendar';

render((
    <SimpleCalendar
        selectMode = {0}
        selectedDates = {[utils.make_date(2016, 4, 13)]}
        onChange = {(new_list, old_list) => console.log('onChange', new_list, old_list)}
    />
), document.getElementById('container'));
`;

let code_2 =
`import React, {Component} from 'react';
import {render} from 'react-dom';
import {SimpleCalendar, utils} from 'react-easy-calendar';

render((
    <SimpleCalendar
        selectMode = {1}
        selectedDates = {[utils.make_date(2016, 4, 1), utils.make_date(2016, 4, 13)]}
        showOutRange = {false}
        onChange = {(new_list, old_list) => console.log('onChange', new_list, old_list)}
    />
), document.getElementById('container'));
`;

let code_3 =
`import React, {Component} from 'react';
import {render} from 'react-dom';
import {SingleRangeCalendar, utils} from 'react-easy-calendar';

render((
    <SingleRangeCalendar
        selectedDates = {[utils.make_date(2016, 4, 1), utils.make_date(2016, 4, 13)]}
        showOutRange = {true}
        onChange = {(new_list, old_list) => console.log('onChange', new_list, old_list)}
    />
), document.getElementById('container'));
`;

let code_4 =
`import React, {Component} from 'react';
import {render} from 'react-dom';
import {DoubleRangeCalendar, utils} from 'react-easy-calendar';

render((
    <DoubleRangeCalendar
        selectedDates = {[utils.make_date(2016, 4, 10), utils.make_date(2016, 5, 13)]}
        onChange = {(new_list, old_list) => console.log('onChange', new_list, old_list)}
    />
), document.getElementById('container'));
`;

let onChange = (n, o) => {
    console.log('changing', n, o);
};

render((
    <div>
        <div style={styles.one}>
            <h3 style={styles.title}>Simple Calendar</h3>
            <div style={styles.demo}>
                <SimpleCalendar
                    selectMode = {0}
                    selectedDates = {[utils.make_date(2016, 4, 13)]}
                    onChange = {onChange}
                />
            </div>
            <div style={styles.code}>
                <SyntaxHighlighter language='javascript' style={style}>{code_1}</SyntaxHighlighter>
            </div>
        </div>

        <div style={styles.one}>
            <h3 style={styles.title}>Multi-select Calendar</h3>
            <div style={styles.demo}>
                <SimpleCalendar
                    selectMode = {1}
                    selectedDates = {[utils.make_date(2016, 4, 1), utils.make_date(2016, 4, 13)]}
                    showOutRange = {false}
                    onChange = {onChange}
                />
            </div>
            <div style={styles.code}>
                <SyntaxHighlighter language='javascript' style={style}>{code_2}</SyntaxHighlighter>
            </div>
        </div>

        <div style={styles.one}>
            <h3 style={styles.title}>Single Range Calendar</h3>
            <div style={styles.demo}>
                <SingleRangeCalendar
                    selectedDates = {[utils.make_date(2016, 4, 1), utils.make_date(2016, 4, 13)]}
                    showOutRange = {true}
                    onChange = {onChange}
                />
            </div>
            <div style={styles.code}>
                <SyntaxHighlighter language='javascript' style={style}>{code_3}</SyntaxHighlighter>
            </div>
        </div>

        <div style={styles.one}>
            <h3 style={styles.title}>Double Range Calendar</h3>
            <div style={Object.assign({}, styles.demo, {width: 650})}>
                <DoubleRangeCalendar
                    selectedDates = {[utils.make_date(2016, 4, 10), utils.make_date(2016, 5, 13)]}
                    onChange = {onChange}
                />
            </div>
            <div style={Object.assign({}, styles.code, {width: 500})}>
                <SyntaxHighlighter language='javascript' style={style}>{code_4}</SyntaxHighlighter>
            </div>
        </div>
    </div>
), document.getElementById('app_root'));

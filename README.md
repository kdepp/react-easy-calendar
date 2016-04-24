# React Easy Calendar (REC)

REC is a react calendar component which is easy to use.

### Installation

```
npm install --save react-easy-calendar
```

### Online Demo

[http://kdepp.github.io/react-easy-calendar/demo.html](http://kdepp.github.io/react-easy-calendar/demo.html)

### Screenshots

**Simple Calendar**   
![simple calendar](https://cloud.githubusercontent.com/assets/461599/14759773/07114b90-0961-11e6-960a-91e43b6a4ce4.png)

**Multi-Select Calendar**   
![simple calendar](https://cloud.githubusercontent.com/assets/461599/14759775/0711c9d0-0961-11e6-885c-bb5309876f4d.png)

**Single Range Calendar**   
![single range calendar](https://cloud.githubusercontent.com/assets/461599/14759774/07114a8c-0961-11e6-9b97-cc2d57b2a65f.png)

**Double Range Calendar**   
![double range calendar](https://cloud.githubusercontent.com/assets/461599/14759772/071036d8-0961-11e6-9d4a-0920471635ce.png)

### Usage


``` js
// a normal calendar

import {SimpleCalendar, utils} from 'react-easy-calendar';

var app = React.createClass({
    render: function () {
        return (
            <SimpleCalendar
                mday  = {utils.make_date(2016, 4, 1)}
                today = {utils.make_date(2016, 4, 21)}
                selectedDates = {[utils.make_date(2016, 4, 13)]}
                selectMode   = {0}
            />
        );
    }
});
```

``` js
// A multi-select calendar

import {SimpleCalendar, utils} from 'react-easy-calendar';

var app = React.createClass({
    render: function () {
        return (
            <SimpleCalendar
                mday  = {utils.make_date(2016, 4, 1)}
                today = {utils.make_date(2016, 4, 21)}
                selectedDates = {[utils.make_date(2016, 4, 1), utils.make_date(2016, 4, 13)]}
                selectMode   = {1}
                showOutRange = {true}
            />
        );
    }
});
```

### Component Props

- **onChange** (optional)
    - callback for change of selected dates

- **onUpdateState** (optional)
    - callback for state changes after mouse hover & mouse leave & click on dates

- **mday** (optional)
    - sample date of the month
    - ```default: today```

- **today** (optional)
    - the current day
    - ```default: today```

- **validRange** (optional)
    - a tuple of dates, selection can only be made in the valid range

- **selectedDates** (optional)
    - a list of selected dates

- **selectedReducer** (optional)
    - customize selected date state change reducer

- **selectMode** (optional)
    - calendar select mode, single or multiple. It will use the default select reducer if you don't customize it.

- **showOutRange** (optional)
    - whether to show out-of-range dates

- **styles** (optional)
    - customize styles


### Calendar Utils API

- #### make_date(year, month, day)
    Generate a new date object
    - **param**: `year` { Number }
    - **param**: `month` { Number }
    - **param**: `day` { Number }

- #### system_date(date)
    Generate a vannila date object from REC calendar date oject
    - **param**: `date` { Date }

- #### compare(level, date1, date2)
    Compare two dates by year, month or date
    - **param**: `level` { String }    
        'year', 'month', 'day'
    - **param**: `date1` { Date }
    - **param**: `date2` { Date }

- #### date_in_range(date, range)
    check whether date is in the range
    - **param**: `date` { Date }
    - **param**: `range` { Array }   
        a tuple of date objects (`[start, end]`)

- #### days_of_month(date)
    day count of the month corresponding to the date
    - **param**: `date` { Date }   

- #### normalize(date)
    if month or day is out of range, transform it into the normal form
    - **param**: `date` { Date }   

- #### offset_date(date, offset)
    Get date with offset to the original
    - **param**: `date` { Date }   
    - **param**: `offset` { Number }   

### Development

```
git clone https://github.com/kdepp/react-easy-calendar.git
npm install
npm run dev
```

local example: [http://localhost:8384](http://localhost:8384)

### Licence

MIT

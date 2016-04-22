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
![simple calendar](https://cloud.githubusercontent.com/assets/461599/14698415/19c78fc0-07c1-11e6-9f17-6c7eb27708c7.png)

**Single Range Calendar**   
![single range calendar](https://cloud.githubusercontent.com/assets/461599/14698414/199d41e8-07c1-11e6-9058-8bf79a049179.png)

**Double Range Calendar**   
![double range calendar](https://cloud.githubusercontent.com/assets/461599/14698413/199c5eb8-07c1-11e6-80e8-6d3b3fffee8a.png)

### Usage

``` js
import {SimpleCalendar} from 'react-easy-calendar';

var app = React.createClass({
    render: function () {
        return (
            <SimpleCalendar
                mday  = {make_date(2016, 4, 1)}
                today = {make_date(2016, 4, 21)}
                selectMode   = {1}
                showOutRange = {true}
            />
        );
    }
});
```

### Component Props

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

- **selectedRange** (optional)
    - a tuple of selected dates

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

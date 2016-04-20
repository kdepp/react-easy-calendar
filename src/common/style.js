const CALENDAR_WIDTH = 300;

export const get_style = (styles, classes) => {
	return classes.reduce((prev, x) => Object.assign({}, prev, styles[x]), {});
};


export const calendar_styles = {
	calendar: {
		width: CALENDAR_WIDTH
	},
	header: {
        marginBottom: '5px',
        padding: '5px',
        borderBottom: '1px solid #ccc',
		overflow: 'hidden'
	},
	prev_month: {
		float: 'left'
	},
	next_month: {
		float: 'right'
	},
	prev_year: {
		float: 'left',
        marginRight: '15px'
	},
	next_year: {
		float: 'right',
        marginLeft: '15px'
	},
	month_title: {
		overflow: 'hidden',
		textAlign: 'center'
	},
	weeks: {
		padding: 0,
		listStyleType: 'none'
	},
	week: {
        boxSizing: 'border-box',
		padding: `0 ${CALENDAR_WIDTH * 0.01}px`,
		overflow: 'hidden'
	},
	day: {
		float: 'left',
        boxSizing: 'border-box',
		padding: `0 ${CALENDAR_WIDTH * 0.01}px`,
		width: `${CALENDAR_WIDTH * 0.14}px`,
		listStyleType: 'none',
		textAlign: 'center',
		cursor: 'pointer'
	},
	lt_month_day: {
		color: '#ccc'
	},
	gt_month_day: {
		color: '#ccc'
	},
	weekday_title: {
		fontWeight: 'bold'
	},
	selected_day: {
		backgroundColor: 'pink'
	},
	ranged_day: {
		backgroundColor: '#EBEEF9'
	},
	banned_day: {
		backgroundColor: '#f3f3f3',
        color: '#bcbcbc',
        cursor: 'not-allowed'
	},
    hovered_day: {
        backgroundColor: 'cyan'
    },
	default_day: {
		backgroundColor: '#cceecc'
	},
    ok: {
        display: 'block',
        border: '1px solid black',
        borderRadius: '5px',
        textAlign: 'center'
    },
    status: {
        padding: '5px',
        overflow: 'hidden',
        borderBottom: '1px solid #ccc'
    }
};




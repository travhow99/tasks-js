import React, { useState } from 'react';
import { DateTime } from 'luxon';
import './Calendar.css';

const Calendar = (props) => {
    // const weekdays = [0, 1, 2, 3, 4, 5, 6];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dt = DateTime.local();

    const [selectedDay, setSelectedDay] = useState(dt);

    console.log('current selected...', selectedDay, selectedDay.toISODate(), selectedDay.year)

    let firstWeekInMonth = selectedDay.startOf('month').weekNumber;
    console.log(firstWeekInMonth);
    if (firstWeekInMonth === 53) firstWeekInMonth = 0;

    const daysInMonth = selectedDay.daysInMonth;

    let lastWeekInMonth = selectedDay.endOf('month').weekNumber;
    console.log(lastWeekInMonth);

    if (lastWeekInMonth === 1) lastWeekInMonth = 53;

    if (selectedDay.month === 1) {

    }
    
    let diff = lastWeekInMonth - firstWeekInMonth;
    let current = 0;
    let calendar = [];

    while (current <= diff) {
        let useWeek = selectedDay.startOf('month').plus({week: current}).startOf('week');

        calendar.push({
            week: current,
            days: Array(7).fill(0).map((n, i) => useWeek.set({ day: useWeek.day + i - 1})) 
        });

        if (useWeek.weekNumber === selectedDay.endOf('month').weekNumber && selectedDay.endOf('month').weekday === 7) diff++;

        current++;
    }

    /* console.log('building calendar', firstWeekInMonth, lastWeekInMonth)
    for (let week = firstWeekInMonth; week <= lastWeekInMonth; week++) {
        console.log(selectedDay.year, 'setting to ' + week)
        let useWeek = selectedDay.set({ weekNumber: week });
        console.log(useWeek);
        useWeek = useWeek.startOf('week')

        console.log(useWeek.year);

        calendar.push({
            week: week,
            days: Array(7).fill(0).map((n, i) => useWeek.set({ day: useWeek.day + i - 1})) 
        });

        if (week === lastWeekInMonth && useWeek.endOf('week').day === daysInMonth) {
            let lastWeek = useWeek.set({weekNumber: week + 1});

            calendar.push({
                week: week + 1,
                days: Array(7).fill(0).map((n, i) => lastWeek.set({ day: lastWeek.day + i - 1 })) 
            });
        }
    } */

    console.log(calendar);

    const dateClassName = (day) => {
        let className = 'calendar-day-container';

        let addition = day.hasSame(selectedDay, 'month') 
                        ? day.hasSame(selectedDay, 'day')
                            ? ' calendar-current-date'
                            : ''
                        : day.startOf('month') < selectedDay.startOf('month')
                            ? ' calendar-previous-date'
                            : ' calendar-future-date';

        className += addition;

        return className;
    }

    const dayClassName = (day) => {
        let className = 'calendar-day';
        className += is_today(day) ? ' selected-date' : '';

        return className;
    }

    const is_today = (day1) => {
        return day1.day === selectedDay.day && day1.month === selectedDay.month && day1.year === selectedDay.year;
    }

    const abbreviate = (str) => str.substring(0, 3);

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="calendar-month-btn" onClick={(() => {
                    setSelectedDay(selectedDay.set({month: selectedDay.month - 1}));
                })}>
                    {/* <FaAngleLeft /> */}
                    Prev
                </div>
                <div className="calendar-header-month">
                    {selectedDay.monthLong}{selectedDay.year !== dt.year && <span>&nbsp;{selectedDay.year}</span>}
                </div>
                <div className="calendar-month-btn" onClick={(() => {
                    setSelectedDay(selectedDay.set({month: selectedDay.month + 1}));
                })}>
                    {/* <FaAngleRight /> */}
                    Next
                </div>
            </div>
            {!is_today(dt) &&
                <div className="calendar-btn-container">
                    <div className="calendar-today-btn" onClick={(()=> setSelectedDay(dt))}>
                        Today
                    </div>
                </div>
            }


            <div className="calendar-week calendar-week-header">
                {days.map((d, index) => (
                    <div key={index}>{abbreviate(d)}</div>
                ))}
            </div>
            {calendar.map((week) => (
                <div key={week.week} className="calendar-week">
                    {week.days.map((day, index) => (
                        <div key={index} className={dateClassName(day)}>
                            <div className={dayClassName(day)} onClick={(() => setSelectedDay(day))}>
                                {day.day}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Calendar;
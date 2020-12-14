import React, { useState } from 'react';
import { DateTime } from 'luxon';

const Calendar = (props) => {
    const weekdays = [0, 1, 2, 3, 4, 5, 6];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dt = DateTime.local();
    const today = dt.toLocaleString();

    const [selectedDay, setSelectedDay] = useState(dt);

    const firstDayInMonth = selectedDay.set({day: 1}).weekday;
    const daysInMonth = selectedDay.daysInMonth;
    const daysAfterFirstWeek = 7 - daysInMonth;

    // const dateSessions = props.data[selectedDate];
    // const startWeek = moment(selectedDate).startOf('month').week();
    // const endWeek = moment(selectedDate).month() != 11 ? moment(selectedDate).endOf('month').week() : 53;

    /* let calendar = []
    for (var week = startWeek; week <= endWeek; week++) {
        calendar.push({
            week: week,
            days: Array(7).fill(0).map((n, i) => moment(selectedDate).week(week).startOf('week').clone().add(n + i, 'day'))
        })
    } */

    const abbreviate = (str) => str.substring(0, 3);
    
    console.log(dt, firstDayInMonth, daysInMonth);
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {days.map((d, index) => (
                            <th key={index}>{abbreviate(d)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* First week in month */}
                    <tr>
                        {weekdays.map((x, index) => (
                            <td key={index}>
                                {x === firstDayInMonth ? 1 : (
                                    x > firstDayInMonth && x - firstDayInMonth + 1
                                )}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td scope="row"></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            Calendar
        </div>
    )
}

export default Calendar;
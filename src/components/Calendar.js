import React, { useState } from 'react';
import { DateTime } from 'luxon';
import './Calendar.css';

const Calendar = (props) => {
    // const weekdays = [0, 1, 2, 3, 4, 5, 6];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dt = DateTime.local();
    // const today = dt.toLocaleString();

    const [selectedDay, setSelectedDay] = useState(dt);

    console.log('current selected...', selectedDay, selectedDay.year)

    let firstWeekInMonth = selectedDay.set({ day: 1 }).weekNumber;
    
    if (firstWeekInMonth === 53) firstWeekInMonth = 0;

    const daysInMonth = selectedDay.daysInMonth;

    let lastWeekInMonth = selectedDay.set({ day: daysInMonth }).weekNumber;
    if (lastWeekInMonth === 1) lastWeekInMonth = 53;

    let calendar = [];
    console.log('building calendar', firstWeekInMonth, lastWeekInMonth)
    for (let week = firstWeekInMonth; week <= lastWeekInMonth; week++) {
        let useWeek = selectedDay.set({ weekNumber: week });
        useWeek = useWeek.startOf('week')

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
    }

    console.log(calendar)

    const abbreviate = (str) => str.substring(0, 3);

    console.log(selectedDay);
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

            <div className="calendar-btn-container">
                <div className="calendar-today-btn" onClick={(()=> setSelectedDay(dt))}>
                    Today
                </div>
            </div>


            <div className="calendar-week calendar-week-header">
                {days.map((d, index) => (
                    <div key={index}>{abbreviate(d)}</div>
                ))}
            </div>
            {calendar.map((week) => (
                <div key={week.week} className="calendar-week">
                    {week.days.map((day, index) => (
                        <div key={index} /* className={dateClassName(day)} */>
                            <div className={''/* dayClassName(day) */} onClick={(() => setSelectedDay(day))}>
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
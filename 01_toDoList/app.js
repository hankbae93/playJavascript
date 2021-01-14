'use strict';

// 달력
const 
    calendar = document.querySelector('.calendar'),
    calendarUI = calendar.querySelector('.calendar_interface'),
    calendarTable = calendarUI.querySelector('table'),
    calendarDay = calendarTable.querySelectorAll('td'),
    calendarTime = calendarUI.querySelector('.calendar_time');
const 
    calendarPrevMonth = calendarUI.querySelector('.prevMonth'),
    calendarNextMonth = calendarUI.querySelector('.nextMonth');

const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



function fillMonthYear(month, year) {
    const thisMonth = MONTH[month];
    calendarTime.querySelector('p').innerHTML = `${thisMonth} ${year}`;
}

function fillDay(firstDay, lastDate) {    
    let num = 1;
    calendarDay.forEach((item, idx) => {
        if (idx >= firstDay && num <= lastDate) {
            item.innerHTML = num;
            num++;
        }        
    });    
}

function fillCalendar() {
    const    
        today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        date = today.getDate();            
    const startDay = new Date(year, today.getMonth(), 1);
    const lastDay = new Date(year, today.getMonth() + 1, 0).getDate();

    fillMonthYear(month, year);
    fillDay(startDay.getDay(), lastDay); // 첫날 요일, 마지막 날짜
}


fillCalendar();

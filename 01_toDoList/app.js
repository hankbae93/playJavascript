'use strict';

// 달력
const 
    calendar = document.querySelector('.calendar'),
    calendarUI = calendar.querySelector('.calendar_interface'),
    calendarTable = calendarUI.querySelector('table'),
    calendarDay = calendarTable.querySelectorAll('td'),
    calendarTime = calendarUI.querySelector('.calendar_time'),
    calendarEvent = calendar.querySelector('.calendar_sub'),
    calendarEventBtn = calendarEvent.querySelector('.createEvent');
    
const 
    calendarPrevMonth = calendarUI.querySelector('.prevMonth'),
    calendarNextMonth = calendarUI.querySelector('.nextMonth');



// 달력 채우기
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];      
const todayDownload = new Date();

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

function fillCalendar(DAY) {
    const            
        year = DAY.getFullYear(),
        month = DAY.getMonth(),
        date = DAY.getDate();            
    const startDay = new Date(year, DAY.getMonth(), 1);
    const lastDay = new Date(year, DAY.getMonth() + 1, 0).getDate();
    
    fillMonthYear(month, year);
    fillDay(startDay.getDay(), lastDay); // 첫날 요일, 마지막 날짜
}

// 달력 변경
let 
    cMonth = 1,
    cYear = todayDownload.getFullYear(),
    btnSwitch = true;

function countClick() {
    if (btnSwitch) {
        if (cMonth > 11) { 
            cMonth = 0;
            cYear++;
        }         
        cMonth++; 
    } else {
        if (cMonth === 1) {
            cMonth= 13;
            cYear--;
        }
        cMonth--;
    }   
    changeCalendar(cMonth); 
}

function changeCalendar(cMonth) {
    const dayString = `${cYear}-${todayDownload.getMonth() + cMonth}-${todayDownload.getDay()}`;
    const changeDate = new Date(dayString);    

    resetCalendar();
    fillCalendar(changeDate);
}

function resetCalendar() {
    calendarDay.forEach(item => item.innerHTML = '');
}

calendarPrevMonth.addEventListener('click', () => {
    btnSwitch = false;
    countClick();
});
calendarNextMonth.addEventListener('click', () => {
    btnSwitch = true;
    countClick();
});


fillCalendar(todayDownload);




// 이벤트 저장 및 메모

calendarEventBtn.addEventListener('click',(e) => {    
    e.target.classList.toggle('saveEvent');
    if (e.target.classList.contains('saveEvent')) {
        e.target.innerHTML = 'Save';
    } else {
        e.target.innerHTML = 'Create Event';
    }    
});



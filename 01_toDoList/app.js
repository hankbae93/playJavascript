'use strict';

// 달력
const 
    calendar = document.querySelector('#calendar'),
    calendarUI = calendar.querySelector('.calendar_interface'),
    calendarTable = calendarUI.querySelector('table'),
    calendarDay = calendarTable.querySelectorAll('td'),
    calendarTime = calendarUI.querySelector('.calendar_time'),
    calendarMgoal = calendar.querySelector('.calendar_month'),
    calendarCreateGo = calendar.querySelector('.createGoal');
    
const 
    calendarPrevMonth = calendarUI.querySelector('.prevMonth'),
    calendarNextMonth = calendarUI.querySelector('.nextMonth');



// 달력 채우기
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];      
const todayDownload = new Date(); //오늘 자

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
let createOrSave = true;
function createOrSaveBtn() {
    if(createOrSave) {
        document.body.style.background = '#222831';
        this.firstElementChild.textContent = 'Save';
        createOrSave = false;
    } else {
        document.body.style.background = 'var(--background-color)';
        this.firstElementChild.textContent = 'Create Goals';
        createOrSave = true;
    }        
}

calendarCreateGo.addEventListener('click',createOrSaveBtn);

calendarMgoal.addEventListener('click',(e) => {    
    if (e.target.checked) {
        e.target.parentElement.classList.add('checked');
    } else {
        e.target.parentElement.classList.remove('checked');
    }    
});



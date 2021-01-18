'use strict';

// 달력
const 
    calendar = document.querySelector('#calendar'),
    calendarUI = calendar.querySelector('.calendar_interface'),
    calendarTable = calendarUI.querySelector('table'),
    calendarDay = calendarTable.querySelectorAll('td'),
    calendarTime = calendarUI.querySelector('.calendar_time'),
    calendarMonth = calendar.querySelector('.calendar_month'),
    calMonGoal = calendarMonth.querySelector('.month_goal'),    
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

function createGoals() {
    let ele = document.createElement('div');
    ele.classList.add('month_goal_con');
    ele.innerHTML = 
        `
        <label>
        <input type="checkbox" class="checkbox" />
        </label>                                    
        <input type="text" readonly />
        <div class="goal_delete hide">
            <div></div>
            <div></div>
        </div>
        `;
    return ele;
}


function checkGoal() {   
    const mGoals = calMonGoal.querySelectorAll('.month_goal_con');
    mGoals.forEach((con) =>{
        const checkBox = con.querySelector(`input[type="checkbox"]`);
        const typeBox = con.querySelector(`input[type="text"]`);
        const deleteBtn = con.querySelector('.goal_delete');
        // 체크 기능
        if(checkBox.checked){
            typeBox.readOnly = false;
            deleteBtn.classList.remove('hide');
        } else {
            typeBox.readOnly = true;
            deleteBtn.classList.add('hide');
        }

        
    })
}

function deleteGoal() {
    const deleteBtn = calMonGoal.querySelectorAll('.goal_delete');
    
}



calMonGoal.addEventListener('click', (e) => {          
    //현재 클릭한 체크박스 체크 or 해제
    if (e.target.checked) {
        e.target.parentElement.classList.add('checked');        
    } else {
        e.target.parentElement.classList.remove('checked');       
    }
    checkGoal();   
    deleteGoal();
    // 삭제할 때
    
});














calendarCreateGo.addEventListener('click', () => { calMonGoal.appendChild(createGoals());});
'use strict';
const canvasBox = document.querySelector('.scratch');
const canvas = canvasBox.querySelector('#scratchPaper');
const ctx = canvas.getContext('2d');
const brush = document.querySelectorAll('.scratch_brush');
const eraser = brush[brush.length - 1];


// 캔버스 그림 기능 
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let brushThick = 5;
let direction = true;
canvas.width = canvasBox.clientWidth;
canvas.height = canvasBox.clientHeight;

ctx.strokeStyle = '#252525';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = brushThick;  

function draw(e) {
    if(!isDrawing) return; // false일때는 그려지지 않게    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];    // lastX , lastY 값을 지금 마우스 좌표로 업데이트    
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;  
    }   
}

canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mousedown',(e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
}); // 누를때
canvas.addEventListener('mouseup',() => { isDrawing = false;});
canvas.addEventListener('mouseout',() => { isDrawing = false;});

// 캔버스 선 굵기 조절

brush.forEach((brush) => {
    brush.addEventListener('click',() =>{
        ctx.lineWidth = brush.dataset.thick;
    });
});

// 캔버스 지우기
function eraseLine() {
    ctx.strokeStyle = '#fff';
}

eraser.addEventListener('click', eraseLine);
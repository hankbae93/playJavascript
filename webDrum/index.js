const container = document.querySelector('.container');
const drumBox = document.querySelectorAll('.drumBox');

const audio0 = document.getElementById("myAudio0");
const audio1 = document.getElementById("myAudio1");
const audio2 = document.getElementById("myAudio2");
const audio3 = document.getElementById("myAudio3");
const audio4 = document.getElementById("myAudio4");
const audio5 = document.getElementById("myAudio5");


let audioSwitch0 = 1;
let audioSwitch1 = 1;
let audioSwitch2 = 1;
let audioSwitch3 = 1;
let audioSwitch4 = 1;
let audioSwitch5 = 1;


drumBox[0].addEventListener("click", function () {      
    audio0.loop = false; // 반복재생하지 않음
    audio0.volume = 0.5; // 음량 설정
    if (audioSwitch0) {
        audio0.play(); // sound1.mp3 재생
        audioSwitch0 = 0;
    } else {
        audio0.pause();
        audio0.currentTime = 0;
        audioSwitch0 = 1;
    }    
    
});    

drumBox[1].addEventListener("click", function () {    
    audio1.loop = false; // 반복재생하지 않음
    audio1.volume = 0.5; // 음량 설정
    if (audioSwitch1) {
        audio1.play(); // sound1.mp3 재생
        audioSwitch1 = 0;
    } else {
        audio1.pause();
        audio1.currentTime = 0;
        audioSwitch1 = 1;
    }  
      
});
drumBox[2].addEventListener("click", function () {
    audio2.loop = false; // 반복재생하지 않음
    audio2.volume = 0.5; // 음량 설정
    if (audioSwitch2) {
        audio2.play(); // sound1.mp3 재생
        audioSwitch2 = 0;
    } else {
        audio2.pause();
        audio2.currentTime = 0;
        audioSwitch2 = 1;
    }  
      
});
drumBox[3].addEventListener("click", function () {
    audio3.loop = false; // 반복재생하지 않음
    audio3.volume = 0.5; // 음량 설정
    if (audioSwitch3) {
        audio3.play(); // sound1.mp3 재생
        audioSwitch3 = 0;
    } else {
        audio3.pause();
        audio3.currentTime = 0;
        audioSwitch3 = 1;
    }  
      
});
drumBox[4].addEventListener("click", function () {
    audio4.loop = false; // 반복재생하지 않음
    audio4.volume = 0.5; // 음량 설정
    if (audioSwitch4) {
        audio4.play(); // sound1.mp3 재생
        audioSwitch4 = 0;
    } else {
        audio4.pause();
        audio4.currentTime = 0;
        audioSwitch4 = 1;
    }  
      
});
drumBox[5].addEventListener("click", function () {
    audio5.loop = false; // 반복재생하지 않음
    audio5.volume = 0.5; // 음량 설정
    if (audioSwitch5) {
        audio5.play(); // sound1.mp3 재생
        audioSwitch5 = 0;
    } else {
        audio5.pause();
        audio5.currentTime = 0;
        audioSwitch5 = 1;
    }  
      
});



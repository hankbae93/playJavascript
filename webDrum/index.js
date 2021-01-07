const container = document.querySelector('.container');
const drumBox = document.querySelectorAll('.drumBox');

const colorBox = [
    "red","yellow","white","tan","purple","black"
];


drumBox[0].addEventListener('click',function(e){
    playDrum(0);
});
drumBox[1].addEventListener('click',function(e){
    playDrum(1);
});
drumBox[2].addEventListener('click',function(e){
    playDrum(2);
});
drumBox[3].addEventListener('click',function(e){
    playDrum(3);
});
drumBox[4].addEventListener('click',function(e){
    playDrum(4);
});
drumBox[5].addEventListener('click',function(e){
    playDrum(5);
});


function changeColor() {
    container.style.background = "red";
};

function playDrum(num) {
    container.style.background = colorBox[num];
};





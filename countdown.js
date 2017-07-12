

var prehours,premins,presecs;
var date1 = new Date();
prehours = date1.getHours();
premins = date1.getMinutes();
presecs = date1.getSeconds();

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function () {

    window_width = document.documentElement.clientWidth;
    window_height = document.body.clientHeight;
    margin_left = Math.round(window_width/10);
    radius = Math.round(window_width*4/5/108)-1;
    margin_top = Math.round(window_height/5);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = window_width;
    canvas.height = window_height;

    setInterval(function () {
        render(context);
    },50);

};


var render = function(cxt) {
    cxt.clearRect(0,0,window_width,window_height);
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if(parseInt(hours/10)!=parseInt(prehours/10)){
        addball(margin_left,margin_top,parseInt(hours/10));
    }
    if(parseInt(hours%10)!=parseInt(prehours%10)){
        addball(margin_left + 15*(radius+1),margin_top,parseInt(hours%10));
    }
    if(parseInt(minutes/10)!=parseInt(premins/10)){
        addball(margin_left + 39*(radius+1),margin_top,parseInt(minutes/10));
    }
    if(parseInt(minutes%10)!=parseInt(premins%10)){
        addball(margin_left + 54*(radius+1),margin_top,parseInt(minutes%10));
    }
    if(parseInt(seconds/10)!=parseInt(presecs/10)){
        addball(margin_left + 78*(radius+1),margin_top,parseInt(seconds/10));
    }
    if(parseInt(seconds%10)!=parseInt(presecs%10)){
        addball(margin_left + 93*(radius+1),margin_top,parseInt(seconds%10));
    }

    prehours = hours;
    premins = minutes;
    presecs = seconds;

    updateballs();

    renderDigit(margin_left,margin_top,parseInt(hours/10),cxt);
    renderDigit(margin_left + 15*(radius+1),margin_top,parseInt(hours%10),cxt);
    renderDigit(margin_left + 30*(radius+1),margin_top,10,cxt);
    renderDigit(margin_left + 39*(radius+1),margin_top,parseInt(minutes/10),cxt);
    renderDigit(margin_left + 54*(radius+1),margin_top,parseInt(minutes%10),cxt);
    renderDigit(margin_left + 69*(radius+1),margin_top,10,cxt);
    renderDigit(margin_left + 78*(radius+1),margin_top,parseInt(seconds/10),cxt);
    renderDigit(margin_left + 93*(radius+1),margin_top,parseInt(seconds%10),cxt);

    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x,balls[i].y,radius,0,2*Math.PI,true);
        cxt.closePath();

        cxt.fill();
    }
    console.log(balls.length)
};


var renderDigit = function(x,y,num,cxt){
    cxt.fillStyle = "rgb(0,102,153)";

    for(var i = 0;i<digit[num].length;i++){
        for(var j = 0; j<digit[num][i].length ;j++){
            if(digit[num][i][j]==1){

                cxt.beginPath();
                cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();

            }
        }
    }
};

var addball = function (x,y,num) {

    for(var i = 0;i<digit[num].length;i++){
        for(var j = 0; j<digit[num][i].length ;j++){
            if(digit[num][i][j]==1){
                var aball = {
                    x:x+j*2*(radius+1)+(radius+1),
                    y:y+i*2*(radius+1)+(radius+1),
                    g:2*Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*2,
                    vy:0,
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aball);
            }
        }
    }
};

var updateballs = function () {

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= window_height-radius){
            balls[i].y = window_height-radius;
            balls[i].vy = - balls[i].vy*0.55;
        }
    }

    var cnt = 0;
    for( var i = 0 ; i < balls.length ; i ++ ){
        if( balls[i].x + radius>0 && balls[i].x-radius< window_width)
            balls[cnt++] = balls[i];
    }
    while (balls.length>cnt){
        balls.pop();
    }
};
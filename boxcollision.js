const viewport=document.getElementById('viewport');

const viewportValue=viewport.getBoundingClientRect();
const boundaryWidth=viewportValue.right-viewportValue.left
const boundaryHeight=viewportValue.bottom-viewportValue.top;
console.log(boundaryHeight,boundaryWidth)
const fps=60;
function getRandomInt(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min)+min);
}
function Ball(radius){
this.ball=document.createElement('div');
this.ball.classList.add('ball');

this.ball.style.width=2*radius+'px';
this.ball.style.height=2*radius+'px';
this.ball.style.backgroundColor=randomColor();

viewport.appendChild(this.ball);

this.x=getRandomInt(0,boundaryWidth)
this.y=getRandomInt(0,boundaryHeight)
//console.log(boundaryWidth,boundaryHeight)
this.ball.style.top=this.y+'px';
this.ball.style.left=this.x+'px';
this.ball.style.position="absolute";

this.dx=getDirection();
this.dy=getDirection();

this.speed=1;
this.radius=radius;

this.draw=function(){
viewport.appendChild(this.ball);
}

this.move=function(){
    setInterval(() => {
        this.x+=this.speed*this.dx;
        this.y+= this.speed*this.dy;
        this.ball.style.top=this.y+'px';
        this.ball.style.left=this.x+'px';
        //console.log(this.x,this.y)
        
        this.checkCollision();
        for(var i=0;i< ballArray.length;i++){
            for(var j =0;j<ballArray.length;j++){
                if(i!==j){
                    currentBall=ballArray[i];
                    nextBall=ballArray[j];
                    this.checkBallCollision(currentBall,nextBall)
                }
            }
        }
       

    },1/fps);

}
this.checkCollision=function(){
    if (this.x+(2*radius)> boundaryWidth){
        this.dx=-1;
    }
    if (this.y+(2*radius)>boundaryHeight){
        this.dy=-1
    }
    if(this.x+(2*radius)<0){
        this.dx=1
    }
    if(this.y<0){
        this.dy=1
    }
  
}
this.checkBallCollision=(currentBall,nextBall)=>{
    var radiusSum=currentBall.radius+nextBall.radius
            var ddx = (currentBall.x + currentBall.radius) - (nextBall.x + nextBall.radius);
            var ddy = (currentBall.y + currentBall.radius) - (nextBall.y + nextBall.radius);
            var distance = Math.sqrt(ddx * ddx + ddy * ddy);
            if(distance<=radiusSum){
                currentBall.dx*=-1;
                currentBall.dy*=-1;
                console.log('here')
            }

    

}
}
const ballCount=30;
const ballArray=[];
function start(){
    viewport.innerHTML=" ";
    for(let i=0;i<ballCount;i++)
    {
    const ball=new Ball(getRandomInt(3,20));
    ballArray.push(ball);
    ball.draw();
    ball.move();
}

}
function randomColor(){
    function hex(){
        let hex=Math.floor(Math.random()*256).toString(16);//c.toString(16)converts the number into hexadecimal
        return(String(hex))
    }
    return('#'+hex()+hex()+hex());
}
function getDirection(){
    return Math.random()>0.5?1:-1;
}
start();
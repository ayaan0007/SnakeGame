//Game Constants & variables
let inputDir={x: 0 ,y: 0};
const foodSound=new Audio('food.mp3');
const gameoverSound=new Audio('gameover.mp3');
const musicSound=new Audio('snake_music.mp3');
let speed=6;
let lastPaintTime=0;
let snakearr=[
    {x:13,y:15}
]
food={x:6,y:7};
let score=0;


//Game functions
function main(ctime){
    window.requestAnimationFrame(main);    /*for high fps it is preferred over setinterval*/
    console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){         
           return;
    }
    lastPaintTime=ctime;
    gameEngine();    
}
function isCollide(snake){
    //If you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y) {
            return true;
        }
    }

    //If you bump into wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
                return true;
        }
}
    

function gameEngine()
{
    //Part 1:updating the snake array & food
    if(isCollide(snakearr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over!! Press any key to play again");
        snakearr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }

    //If you have eaten the food ,increment the score and regenerate the food
    if(snakearr[0].y ==food.y && snakearr[0].x==food.x){
        score+=1;
        myscore.innerHTML="Score: " +score;
        foodSound.play();
        snakearr.unshift({x:snakearr[0].x + inputDir.x, y:snakearr[0].y + inputDir.y});
        let a= 2;
        let b= 16;
        food={x: Math.round(a+(b-a)* Math.random()),y: Math.round(a+(b-a)* Math.random())}
    }

    //Moving the snake
    for( let i=snakearr.length -2; i>=0 ;i--){
        snakearr[i+1]={...snakearr[i]}; // refrencing thk rakhne ke liye naya object bana h ... ka use kiya gaya h

    }
    snakearr[0].x +=inputDir.x;
    snakearr[0].y +=inputDir.y;
    
    //Part 2:Display the snake and food
    //Display the snake
    board.innerHTML="";
    snakearr.forEach((e,index)=>{       //add karne ke liye loop
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart =e.y;  //kitni durr mai h row uske liye
        snakeElement.style.gridColumnStart =e.x;  //kitni durr mai h column uske liye
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart =food.y;  //kitni durr mai h row uske liye
    foodElement.style.gridColumnStart =food.x;  //kitni durr mai h column uske liye
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main Logic Starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //start the game
    musicSound.play();
    switch(e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;

        default:
            break;
    }  
});
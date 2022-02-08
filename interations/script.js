//Elements
var btnStart , bol , player1 , player2 , pointsPlayer1 , pointsPlayer2 ;

//Animation Control
var game , start ;

//Positions
var posBolX , posBolY , posPlayer1Y , posPlayer2Y ;

//Default Positions
var defPlayer1Y = 50 , defPlayer2Y = 50 , defBolX = 50 , defBolY = 50 ;

//Directions
var dirPlayer1 ;
var bolX , bolY ;

//Velocity
var velBol , velPlayer1 , velPlayer2 ;

//Controls
var key ;
var playing = false ;

function controlbol() {
    posBolX += velBol*bolX ;
    posBolY += velBol*bolY ;

    //player colision
    if((posBolX <= 5) && ((posBolY + 5 >= posPlayer1Y - 10) && (posBolY - 5 <= posPlayer1Y + 10))) {
        bolY = (posBolY-posPlayer1Y)/12
        bolX *= -1 ; 
    }else if((posBolX >= 95) && ((posBolY + 5 >= posPlayer2Y - 10) && (posBolY - 5 <= posPlayer2Y + 10))) {
        bolY = (posBolY-posPlayer2Y)/12
        bolX *= -1 ; 
    } ;

    //cpu colision


    bol.style.top = posBolY + '%';
    bol.style.left = posBolX + '%';
} ;
start()

function player1Control() {
    if (playing) {
        posPlayer1Y += velPlayer1*dirPlayer1 ;
        if (posPlayer1Y >= 90) {
            posPlayer1Y = 90 ;
        }else if (posPlayer1Y <= 10) {
            posPlayer1Y = 10 ;
        } ;
        player1.style.top = posPlayer1Y + '%';
    } ;
} ;

function game() {
    if (playing) {
        player1Control() ;
        controlbol() ;
    } ; 
    frames = requestAnimationFrame(game) ;
} ; 

function startGame() {
    if (!playing) {
        cancelAnimationFrame(frames) ;
        bolY = 0 ;
        if (Math.random()*10 > 5) {
            bolX = 1 ;
        }else{
            bolX = -1 ;
        } ;
        playing = true ;
        dirPlayer1 = 0 ;
        posBolX = defBolX ;
        posBolY = defBolY ;
        posPlayer1Y = defPlayer1Y + '%';
        posPlayer2Y = defPlayer2Y + '%';
        posPlayer1Y = 50 ;
        posPlayer2Y = 50 ;
        game() ;
    } ;
} ;

function start() {
    velBol = velPlayer1 = velPlayer2 = 1 ;
    btnStart = document.getElementById('btnStart') ;
    btnStart.addEventListener('click',startGame) ;
    bol = document.getElementById('bol') ;
    player1 = document.getElementById('player1') ;
    player2 = document.getElementById('player2') ;
    document.addEventListener('keyup',function(event) {
        key = event.keyCode ;
        if (key == 38) {
            dirPlayer1 = 0 ;
        }else if (key == 40) {
            dirPlayer1 = 0 ;
        }
    }) ; 
    document.addEventListener('keydown',function(event) {
        key = event.keyCode ;
        if (key == 38) {
            dirPlayer1 = -1 ;
        }else if (key == 40) {
            dirPlayer1 = 1 ;
        }
    }) ; 
} ;


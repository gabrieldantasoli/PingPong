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

    //players colision
    if((posBolX <= 5) && ((posBolY + 5 >= posPlayer1Y - 10) && (posBolY - 5 <= posPlayer1Y + 10))) {
        bolY = (posBolY-posPlayer1Y)/6
        bolX *= -1 ; 
    }else if((posBolX >= 95) && ((posBolY + 5 >= posPlayer2Y - 10) && (posBolY - 5 <= posPlayer2Y + 10))) {
        bolY = (posBolY-posPlayer2Y)/6
        bolX *= -1 ;
    } ;

    //wall colisions
    if (posBolY + 5 >= 100 || posBolY - 5 <= 0){
        bolY *= -1 ;
    }

    //leave colisions 
    if (posBolX - 2.5 >= 100 ){
        velBol = 0 ;
        posBolX = defBolX ;
        posBolY = defBolY ;
        posPlayer1Y = defPlayer1Y ;
        posPlayer2Y = defPlayer2Y ;
        pointsPlayer1 += 1 ;
        //update points
        document.getElementById('pointsplayer1').innerHTML = pointsPlayer1 ;
        document.getElementById('sacar').style.display = 'block' ;
        playing = false ;
        player1.style.top = posPlayer1Y + '%' ;
        player2.style.top = posPlayer2Y + '%' ;
    }else if (posBolX + 2.5 <= 0) {
        velBol = 0 ;
        posBolX = defBolX ;
        posBolY = defBolY ;
        posPlayer1Y = defPlayer1Y ;
        posPlayer2Y = defPlayer2Y ;
        pointsPlayer2 += 1 ;
        //update points
        document.getElementById('pointsplayer2').innerHTML = pointsPlayer2 ;
        document.getElementById('sacar').style.display = 'block' ;
        playing = false ;
        player1.style.top = posPlayer1Y + '%' ;
        player2.style.top = posPlayer2Y + '%' ;
    }


    bol.style.top = posBolY + '%';
    bol.style.left = posBolX + '%';
} ;

function controlplayer2() {
    if (playing) {
        if (posBolX > 50 && bolX > 0) {
            if (posBolY > posPlayer2Y) {
                posPlayer2Y += velPlayer2 ;
                if (posPlayer2Y >= 90){
                    posPlayer2Y = 90 ;
                } ;
            }else if (posBolY < posPlayer2Y) {
                posPlayer2Y -= velPlayer2 ;
                if (posPlayer2Y <= 10){
                    posPlayer2Y = 10 ;
                } ;
            } ;
        }else {
            if (posPlayer2Y < 50) {
                posPlayer2Y += velPlayer2 ;
            }else if (posPlayer2Y > 50) {
                posPlayer2Y -= velPlayer2 ;
            } ;
        } ;
        player2.style.top = posPlayer2Y + '%' ;
    } ;
} ;

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
        controlplayer2() ;
    } ; 
    frames = requestAnimationFrame(game) ;
} ; 

function startGame() {
    if (!playing) {
        document.getElementById('sacar').style.display = 'none' ;
        cancelAnimationFrame(frames) ;
        bolY = 0 ;
        if (Math.random()*10 > 5) {
            bolX = 1 ;
        }else{
            bolX = -1 ;
        } ;
        velBol = 1.1 ; 
        velPlayer1 = velPlayer2 = 1 ;
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
    pointsPlayer1 = pointsPlayer2 = 0 ;
    btnStart = document.getElementById('sacar') ;
    btnStart.addEventListener('click',startGame) ;
    bol = document.getElementById('bol') ;
    player1 = document.getElementById('player1') ;
    player2 = document.getElementById('player2') ;
    document.addEventListener('keyup',function() {
        dirPlayer1 = 0 ;
    }) ; 
    document.addEventListener('keydown',function(event) {
        key = event.keyCode ;
        if (key == 38) {
            dirPlayer1 = -1 ;
        }else if (key == 40) {
            dirPlayer1 = 1 ;
        }
    }) ; 
    document.querySelector('.arrows').addEventListener('touchstart',function(event) {
        key = event.target.classList ;
        if (key == 'fas fa-arrow-up') {
            dirPlayer1 = -1 ;
        }else if (key == 'fas fa-arrow-down') {
            dirPlayer1 = 1 ;
        }
    }) ;
    document.addEventListener('touchend',function() {
        dirPlayer1 = 0 ;
    }) ; 
} ;

function changepage() {
    let inpts = document.querySelectorAll('#chooses input') ;
    if (inpts[0].checked) {
        window.location.href = 'localxboot.html' ;
    }else if (inpts[1].checked) {
        window.alert('Sorry , this mode is in development . :(')
    }else{
        window.alert('Choose an option !')
    }
} ;

function whatmode() {
    let inpts = document.querySelectorAll('#chooses input') ;
    let lbls = document.querySelectorAll('#chooses label') ;
    lbls.forEach(item => item.classList.remove('active')) ;
    if (inpts[0].checked) {
        lbls[0].classList.add('active') ;
    }else if (inpts[1].checked) {
        lbls[1].classList.add('active') ;
    }
} ;

document.querySelectorAll('#chooses input').forEach(item => {
    item.addEventListener('click',whatmode)
}) ;

start() ;

var wiwidth = document.getElementById('wiwidth') ;
wiwidth.addEventListener('click',function(e) {
    let controls = document.getElementById('controls') ;
    if (e.target.classList[1] == 'fa-desktop') {
        wiwidth.classList = 'fas fa-mobile-alt' ;
    }else if (e.target.classList[1] == 'fa-mobile-alt') {
        wiwidth.classList = 'fas fa-desktop' ;
    } ;
    controls.classList.toggle('active') ;
}) ;
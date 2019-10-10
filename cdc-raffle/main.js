var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "button-active.png",
    "button-off.png",
    "button-pressed.png",
    'button-stop.png'
)

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

$(document).ready(function () {
    const planeMachine = document.querySelector('#jsSlotMachine');

    mySound = new sound("tick.mp3");

    var stateMachine = "default";

    var machine = new SlotMachine(planeMachine, {
        active: 0,
        delay: 600,
        randomize() {
            return 1;
        }
    });

    function machinePlay(){
        // setInterval(function(){ 
        //     mySound.play(); 
        // }, 25);
        stateMachine = 'shuffling';
        $('.jsSlotMachineButton').removeClass('is-pressed').addClass('is-stop');
        machine.shuffle(9999999, () => showModal());
    }

    function machineStop(){
        stateMachine = 'default';
        machine.stop();
        console.log(machine.active);
        setTimeout(function(){ 
            $('.jsSlotMachineButton').removeClass('is-stop');
        }, 700);
        
    }

    $('.jsSlotMachineButton').click(function(){        
        if(stateMachine == 'default'){
            machinePlay();
        }
        else if(stateMachine == 'shuffling'){
            machineStop();

        }
    });

    $('body').keydown(function(e){
        if(e.keyCode == 32){
            $('.jsSlotMachineButton').addClass('is-pressed');
        }
     });

     $('body').keyup(function(e){
        if(e.keyCode == 8){
            // user has pressed backspace
            
        }
        else if(e.keyCode == 32){
            // user has pressed space
            if(stateMachine == 'default'){
                machinePlay();
            }
            else if(stateMachine == 'shuffling'){
                machineStop();

            }
        }
        else if(e.keyCode == 37) { 
            // user has pressed arrow left
            swiperPrize.slidePrev();
        }
        else if(e.keyCode == 39) { 
            // user has pressed arrow right
            swiperPrize.slideNext();
        }
     });

    var swiperThumbnail = new Swiper ('.jsSwiperThumbnail', {
        loop: true,
        simulateTouch:false
    })

    var swiperPrize = new Swiper ('.jsSwiperPrize', {
        loop: true,
    
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
    })

    swiperPrize.on('slideNextTransitionStart', function() { 
        swiperThumbnail.slideNext();
    });

    swiperPrize.on('slidePrevTransitionStart', function() { 
        swiperThumbnail.slidePrev();
    });

    

    


function showModal(){
    setTimeout(function(){ 
        document.getElementById("myModal").style.display = "block"; 
    }, 2000);
    
}

});
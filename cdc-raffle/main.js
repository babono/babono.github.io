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

function showModal(element){
    $('.jsModal').hide();
    $('#'+element).show();
    // document.getElementById("myModal").style.display = "block";     
}

function closeModal(){
    $('.jsModal').hide();
}

function showModalResult(){
    document.getElementById("jsModalResult").style.display = "block";     
}

$(document).ready(function () {
    const planeMachine = document.querySelector('#jsSlotMachine');

    mySound = new sound("tick.mp3");

    //-- state --//
    //-- start -> ready -> shuffling -> stop -> start  --//

    var stateMachine = "start";
    var prizeName;
    var prizeImage;
    var prizeWinner;

    var machine = new SlotMachine(planeMachine, {
        active: 0,
        delay: 600
    });

    function machinePlay(){
        // setInterval(function(){ 
        //     mySound.play(); 
        // }, 25);
        stateMachine = 'shuffling';
        $('.jsCancelPrizeButton').addClass('is-hidden');
        $('.jsSlotMachineButton').removeClass('is-pressed').addClass('is-stop');
        machine.shuffle(9999999);
    }

    function machineStop(){
        stateMachine = 'stop';
        machine.stop();
        prizeWinner = $('.jsSlotMachineItem:nth-child(' + (machine.active+1) + ')').text();
        console.log(prizeWinner);        
        // $('.jsPrizeWinnerName').html();
        setTimeout(function(){ 
            $('.jsSlotMachineButton').removeClass('is-stop').addClass('is-disabled');
            showModal('jsModalWinner');           
        }, 2000);

    }

    function selectPrize(){
        stateMachine = 'ready';
        $('.jsSwiperThumbnail').removeClass('is-locked');
        $('.jsSlotMachineButton').removeClass('is-disabled');
        $('.jsSlotMachineButton').prop("disabled", false);
        $('.jsSelectPrizeButton').addClass('is-hidden');
        $('.jsCancelPrizeButton').removeClass('is-hidden');
        $('.jsSwiperPrizeArrow').addClass('is-hidden');
        $('.jsPrizeTitle').removeClass('is-blinking');       
        prizeName =  $(".jsSwiperPrizeSlide.swiper-slide-active").html();
        prizeImage =  "image-" + $(".jsSwiperPrizeSlide.swiper-slide-active").attr('data-type') + ".png";
        $('.jsPrizeName').html(prizeName);
        $('.jsPrizeImage').attr('src', prizeImage);
        
    }

    function cancelPrize(){
        stateMachine = 'start';
        $('.jsSwiperThumbnail').addClass('is-locked');
        $('.jsSlotMachineButton').addClass('is-disabled');
        $('.jsSlotMachineButton').prop("disabled", true);
        $('.jsSelectPrizeButton').removeClass('is-hidden');
        $('.jsCancelPrizeButton').addClass('is-hidden');
        $('.jsSwiperPrizeArrow').removeClass('is-hidden');
        $('.jsPrizeTitle').addClass('is-blinking');        
    }

    function finish(){
        stateMachine = 'start';
        closeModal();
        $('.jsSwiperThumbnail').addClass('is-locked');
        $('.jsSlotMachineButton').addClass('is-disabled');
        $('.jsSlotMachineButton').prop("disabled", true);
        $('.jsSelectPrizeButton').removeClass('is-hidden');
        $('.jsCancelPrizeButton').addClass('is-hidden');
        $('.jsSwiperPrizeArrow').removeClass('is-hidden');
        $('.jsPrizeTitle').addClass('is-blinking');
    }

    

    $('.jsSlotMachineButton').click(function(){        
        if(stateMachine == 'ready'){
            machinePlay();
        }
        else if(stateMachine == 'shuffling'){
            machineStop();
        }
    });

    $('.jsSelectPrizeButton').click(function(){        
        selectPrize();
    });

    $('.jsCancelPrizeButton').click(function(){        
        cancelPrize();
    });

    $('.jsSingleWinnerButton').click(function(){        
        finish();
    });

    

    

    $('body').keydown(function(e){
        if(e.keyCode == 32){
            $('.jsSlotMachineButton').addClass('is-pressed');
        }
     });

     $('body').keyup(function(e){
        if(e.keyCode == 32){
            $('.jsSlotMachineButton').removeClass('is-pressed');
            // user has pressed space
            if(stateMachine == 'start'){
                selectPrize();
                return;
            }
            else if(stateMachine == 'ready'){
                machinePlay();
                return;
            }
            else if(stateMachine == 'shuffling'){
                machineStop();
                return;
            }
            else if(stateMachine == 'stop'){
                finish();
                return;
            }
        }
        else if(e.keyCode == 37) { 
            // user has pressed arrow left
            if(stateMachine == 'start'){
                swiperPrize.slidePrev();
            }
            
        }
        else if(e.keyCode == 39) { 
            // user has pressed arrow right
            if(stateMachine == 'start'){
                swiperPrize.slideNext();
            }
        }

        else if( e.keyCode == 8 || e.keyCode == 46 ){
            // user has pressed backspace or del
            if(stateMachine == 'ready'){
                cancelPrize();
            }
        }

        else if( e.keyCode == 9){
            // user has pressed tab
            showModalResult();
        }
        
     });

    var swiperThumbnail = new Swiper ('.jsSwiperThumbnail', {
        loop: true,
        simulateTouch:false
    })

    var swiperPrize = new Swiper ('.jsSwiperPrize', {
        loop: true,
        simulateTouch:false,
    
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



    

});
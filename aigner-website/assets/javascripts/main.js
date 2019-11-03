var lastScrollTop = 0;

$(document).ready(function () {
  var newPicksSwiper = new Swiper(".jsNewpicksSwiper", {
    slidesPerView: 2,
    loop: true,
    navigation: {
      nextEl: ".newpicks .swiper-button-next",
      prevEl: ".newpicks .swiper-button-prev"
    },
    pagination: {
      el: '.newpicks .swiper-pagination',
      type: 'fraction',
      clickable: true
    },
    breakpoints: {
      480: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 4
      }
    }
  });

  $(".jsHeaderMenuMobile").on("click", function () {  
    $(this).toggleClass('is-close');
    $('.jsMobileNav').toggleClass('is-open');
    $('body').toggleClass('is-freeze');;
  });

  $(".jsHeaderSeachIcon").on("click", function () {
    $('.jsHeaderSeachInput').toggleClass('is-active');
  });


  $(".jsMobileNavItem").on("click", function () {
    if($(this).hasClass('is-active')){
      $(this).removeClass('is-active');
    }
    else{
      $(".jsMobileNavItem").removeClass('is-active');
      $(this).addClass('is-active');
    }
  });


  $(".jsHeaderNavItem").mouseenter(function () {
    $('.jsHeaderNavItem').removeClass('is-active');
    $(this).addClass('is-active');
  });

  $(".jsHeaderNavContainer").mouseleave(function () {
    $('.jsHeaderNavItem').removeClass('is-active');
  });

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 11;
  var navbarHeight = $(".jsHeader").outerHeight();



  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $(".jsHeader").addClass("is-sticky");
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $(".jsHeader").removeClass("is-sticky")
      }
    }

    lastScrollTop = st;
  }
});


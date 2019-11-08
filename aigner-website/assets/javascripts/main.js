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

  Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };

  
  $("#slider-range").slider({
    range: true,
    min: 199000,
    max: 2990000,
    values: [199000, 2990000],
    slide: function (event, ui) {
      $(".jsRangePriceFloor").val(ui.values[0].format(0, 3, '.', ','));
      $(".jsRangePriceCeiling").val(ui.values[1].format(0, 3, '.', ','));
    }
  });
  
  $(".jsRangePriceFloor").val($("#slider-range").slider("values", 0).format(0, 3, '.', ','));
  $(".jsRangePriceCeiling").val($("#slider-range").slider("values", 1).format(0, 3, '.', ','));


  $('body').on('click', '.jsFilterBoxTrigger', function () {
    var others = $('.jsFilterBoxTrigger').not(this);
    others.closest('.jsFilterBox').removeClass('is-active');
    if ($(this).closest('.jsFilterBox').hasClass("is-active")) {
      $(this).closest('.jsFilterBox').removeClass("is-active");
    } else {
      $(this).closest('.jsFilterBox').addClass("is-active");
    }
  });

  $('body').on('click', '.jsFilterSortDropdownTrigger', function () {
    if ($(this).closest('.jsFilterSortDropdown').hasClass("is-active")) {
      $(this).closest('.jsFilterSortDropdown').removeClass("is-active");
    } else {
      $(this).closest('.jsFilterSortDropdown').addClass("is-active");
    }
  });

  $('body').on('click', '.jsSidebarCategoryDropdownTrigger', function () {
    if ($(this).closest('.jsSidebarCategoryDropdown').hasClass("is-open")) {
      $(this).closest('.jsSidebarCategoryDropdown').removeClass("is-open");
    } else {
      $(this).closest('.jsSidebarCategoryDropdown').addClass("is-open");
    }
  });

  $(".jsFilterSwitch").change(function (e) {
    if ($(this).is(':checked')) {
      $('.jsFilterContainer').show();
    }
    else {
      $('.jsFilterContainer').hide();
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
      $(".jsSidebar").removeClass("is-down");
      
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $(".jsHeader").removeClass("is-sticky")
        $(".jsSidebar").addClass("is-down");
      }
    }

    lastScrollTop = st;
  }
});


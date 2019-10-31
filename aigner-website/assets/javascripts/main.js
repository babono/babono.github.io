$(document).ready(function () {
  console.log("ulalal");
  var newPicksSwiper = new Swiper(".jsNewpicksSwiper", {
      slidesPerView: 4,
      loop: true,
      navigation: {
          nextEl: ".newpicks .swiper-button-next",
          prevEl: ".newpicks .swiper-button-prev"
      }
  });

});

$(document).ready(function(){
  $('.slider-wrap').slick({
    arrows: true,
    dots: false,
    appendArrows: $('.arrows-wrap'),
    prevArrow: '<button id="prev" type="button" class="slick-btn"><i class="icon-left-open" aria-hidden="true"></i></button>',
    nextArrow: '<button id="next" type="button" class="slick-btn"><i class="icon-right-open" aria-hidden="true"></i></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        }
      },
    ]
  });
});

$(document).ready(function(){
	$('#nav-icon3').click(function(){
    $(this).toggleClass('open');
    $('.nav-group').slideToggle(300);
	});
});


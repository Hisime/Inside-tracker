$(document).ready(function() {

  $('.page-header__toggler').click( function() {
    $(this).toggleClass('page-header__toggler--open');
    $('.page-header__right').slideToggle();
  });

  $('.hero-header').owlCarousel({
    items:1,
    smartSpeed: 500,
    loop: true,
    nav: false
  });

  $('.members__items').owlCarousel({
    items:1,
    smartSpeed: 500,
    nav: true,
    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        },
        960:{
            items:3
        }
    }
  });

});
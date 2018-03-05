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

});
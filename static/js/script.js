$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$('.owl-carousel, .services-peep').owlCarousel({
  loop: true,
  margin: 10,
  center: true,
  responsiveClass: true,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  autoHeight: true,
  responsive: {
    0: {
      items: 1,
      nav: true
    },
    600: {
      items: 3,
      nav: true
    },
    1000: {
      items: 4,
      nav: true
    }
  }
})



// Materialize functionalities and initializations
var elem = document.querySelector('.sidenav');
var instance = new M.Sidenav(elem, {
  width: 100
});
$('.close-side').click(function (e) {
  instance.close();
})
// Materialize functionalities and initializations



window.onscroll = function (e) {
  myFunction(e)
};

var navbar = document.getElementsByTagName('nav')[0];
var navWrapper = document.getElementById('navW');
var sticky = navbar.offsetTop;

function myFunction(e) {
  if (window.scrollY > (window.innerHeight / 2)) {
    navWrapper
      .classList
      .add("navbar-fixed");
  } else {
    navWrapper
      .classList
      .remove("navbar-fixed");
  }
}

document
  .getElementById('year')
  .innerText = new Date().getFullYear();

function discount(rate, perc) {
  return rate - (rate * (perc / 100))
}

function priceRow(unitPrice) {
  var priceRow;
  for (var i = 1; i <= 10; i += 1) {
    var unit = (i / 10)
    var price
    if (price !== 0.1) {
      price = parseInt(discount((unit * unitPrice), 3))
      // Math.floor(discount((unit * unitPrice), 3))
    } else {
      price = unit * unitPrice
    }
    priceRow += ("<tr><td>" + unit + "</td><td>" + price + "</td></tr>")
  }
  return priceRow
}
var note = "<tr style='background-color: rgba(242,242,242,0.5)'><td colspan='2'>You only get the price in this table if you buy from any of our <a href='#'>distributors</a></td></td>"

$('#thisWeek tbody').append(priceRow(3000)).append(note)
$('#nextWeek tbody').append(priceRow(4290)).append(note)
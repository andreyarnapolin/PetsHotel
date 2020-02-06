"use strict";

(function ($) {
  $(document).ready(function () {
    // Code
    //Fancybox
    $(".photo").fancybox({});
    //remove or add attribute when screen is different width
    $(document).ready(function () {
      if (window.innerWidth > 1024) {
        $(".gallery__show").removeAttr("data-fancybox");
      }
    });
    $(window).on("resize", function () {
      if ($(window).width() >= 1024) {
        $(".gallery__show").removeAttr("data-fancybox");
      } else {
        $(".gallery__show").attr({
          "data-fancybox": "gallery"
        });
      }
    });
  });
})(jQuery);

{/* <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script> */ }

// <script type="text/javascript">

$(document).ready(function () {
  $('.tab a').on('click', function (e) {
    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    var href = $(this).attr('href');
    $('.forms > form').hide();
    $(href).fadeIn(500);
  });

});

"use strict";

(function($) {
  $(document).ready(function() {
    // FORM LOGIN REGISTRATION
    // $(".tab a").on("click", function(e) {
    //   e.preventDefault();

    //   $(this)
    //     .parent()
    //     .addClass("active");
    //   $(this)
    //     .parent()
    //     .siblings()
    //     .removeClass("active");

    //   let href = $(this).attr("href");
    //   $(".forms > form").hide();
    //   $(href).fadeIn(500);
    // });

    //Fancybox
    $(".photo").fancybox({});
    //remove or add attribute when screen is different width
    $(document).ready(function() {
      if (window.innerWidth > 1024) {
        $(".gallery__show").removeAttr("data-fancybox");
      }
    });
    $(window).on("resize", function() {
      if ($(window).width() >= 1024) {
        $(".gallery__show").removeAttr("data-fancybox");
      } else {
        $(".gallery__show").attr({
          "data-fancybox": "gallery"
        });
      }
    });
    //REVIEW WINDOW

    $(".review__link").click(function reviewWindow() {
      const clonedReviewWrap = $(this.closest(".review__wrap")).clone();
      const clonedReviewImage = $(this.closest(".review__wrap"))
        .find(".review__image")
        .clone();
      const clonedReviewName = $(this.closest(".review__wrap"))
        .find(".review__name")
        .clone();
      $(clonedReviewWrap)
        .find(".review__link")
        .remove();
      $(clonedReviewWrap)
        .find(".review__image")
        .remove();
      $(clonedReviewWrap)
        .find(".review__name")
        .remove();
      let dialog = document.createElement("div"),
        dialogOverlay = document.createElement("div"),
        dialogLink = document.createElement("a");

      dialogOverlay.className = "dialog-overlay";
      dialog.className = "dialog";
      dialogLink.className = "dialog__link";
      $(dialogLink).attr("href", "#");
      $(dialogLink).text("Назад");

      $(dialog).append(clonedReviewWrap);
      $(clonedReviewWrap)
        .find(".review__date")
        .after(clonedReviewImage);
      $(clonedReviewWrap)
        .find(".review__date")
        .after(clonedReviewName);
      $(clonedReviewWrap)
        .find(".review__info")
        .after(dialogLink);
      document.body.append(dialogOverlay, dialog);

      $(".dialog__link").click(function reviewClose() {
        dialogOverlay.remove();
        dialog.remove();
      });
    });
  });
})(jQuery);

"use strict";
//Form registration
(function($) {
  $(document).ready(function() {
    let daysNumber = 0;
    // FORM LOGIN REGISTRATION
    $(".tab a").on("click", function(e) {
      e.preventDefault();
      $(this)
        .parent()
        .addClass("active");
      $(this)
        .parent()
        .siblings()
        .removeClass("active");

      let href = $(this).attr("href");
      $(".forms > form").hide();
      $(href).fadeIn(500);
    });

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

    //DATE
    $(".order__date-input").daterangepicker(
      {
        locale: {
          format: "DD/MM/YYYY",
          separator: " - ",
          applyLabel: "Прийняти",
          cancelLabel: "Відмінити",
          fromLabel: "Від",
          toLabel: "До",
          customRangeLabel: "Custom",
          weekLabel: "Н",
          daysOfWeek: ["Не", "По", "Ві", "Се", "Че", "Пя", "Су"],
          monthNames: [
            "Січень",
            "Лютий",
            "Березень",
            "Квітень",
            "Травень",
            "Червень",
            "Липень",
            "Серпень",
            "Вересень",
            "Жовтень",
            "Листопад",
            "Грудень"
          ],
          firstDay: 1
        },
        startDate: "14/02/2020",
        endDate: "14/02/2020"
      },
      function(start, end) {
        daysNumber =
          (Math.abs(moment(start).diff(moment(end), "days")) + 1) * 150;
        console.log(daysNumber);

        $(".order__amount").text(daysNumber);
        callback();
      }
    );

    //FORM PRICE CALCULATION
    $(".order__check").click(function() {
      callback();
    });

    function callback() {
      let total = 0;
      $("input:checked").each(function() {
        total += parseInt($(this).val());
      });

      $(".order__total").text("Всього " + (total += daysNumber) + " грн.");
    }

    //SHOW PASS
    $(".show-pass").click(function() {
      let field = $(this)
        .parents(".input-field")
        .find(".input-pass");

      field.attr("type", "text");

      setTimeout(() => {
        field.attr("type", "password");
      }, 1000);
    });
    //PRICE LIST
    $("select.form__input").change(function() {
      let cities = [
          {
            name: "poltava",
            price1: "150 грн",
            price2: "250 грн",
            price3: "350 грн",
            price4: "450 грн",
            price5: "550 грн"
          },
          {
            name: "kyiv",
            price1: "100 грн",
            price2: "200 грн",
            price3: "300 грн",
            price4: "400 грн",
            price5: "500 грн"
          }
        ],
        selectedCountry = $(this)
          .children("option:selected")
          .val();
      console.log(selectedCountry);

      switch (selectedCountry) {
        case "poltava":
          $(".services__number-1").text(cities[0].price1);
          $(".services__number-2").text(cities[0].price2);
          $(".services__number-3").text(cities[0].price3);
          $(".services__number-4").text(cities[0].price4);
          $(".services__number-5").text(cities[0].price5);
          break;
        case "kyiv":
          $(".services__number-1").text(cities[1].price1);
          $(".services__number-2").text(cities[1].price2);
          $(".services__number-3").text(cities[1].price3);
          $(".services__number-4").text(cities[1].price4);
          $(".services__number-5").text(cities[1].price5);
          break;
      }
    });
    //REGISTRATION
    $(".services__button-reg").click(function() {
      localStorage.setItem("phone", $(".input-phone-reg").val());
      localStorage.setItem("pass", $(".input-pass-reg").val());
    });
    //LOGIN
    $(".services__button-log").click(function() {
      let storedPhone = localStorage.getItem("phone");
      let storedPass = localStorage.getItem("pass");

      let userPhone = $(".input-phone").val();
      let userPass = $(".input-pass").val();

      if (userPhone == storedPhone && userPass == storedPass) {
        alert("You are loged in.");
      } else {
        alert("ERROR.");
      }
    });
  });
})(jQuery);

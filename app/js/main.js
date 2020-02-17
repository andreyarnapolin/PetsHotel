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
    $("select.form__input, select.services__input").change(function() {
      let cities = {
          service1: {
            poltava: "150 грн",
            kyiv: "300 грн",
            title: "Перетримка (собаки)",
            subtitle: "бокс/вольєр в окремій кімнаті"
          },
          service2: {
            poltava: "250 грн",
            kyiv: "400 грн",
            title: "Перетримка (котики)",
            subtitle: "бокс з відділеннями для сну і гігієни"
          },
          service3: {
            poltava: "350 грн",
            kyiv: "500 грн",
            title: "Грумінг",
            subtitle: "Миття"
          },
          service4: {
            poltava: "450 грн",
            kyiv: "600 грн",
            title: "Грумінг",
            subtitle: "Миття та стрижка"
          },
          service5: {
            poltava: "550 грн",
            kyiv: "700 грн",
            title: "Огляд ветеринара",
            subtitle: "Загальний"
          }
        },
        selectedCountry = $(this)
          .children("option:selected")
          .val();

      $(".services__section").remove();
      for (let key in cities) {
        let price;
        switch (selectedCountry) {
          case "poltava":
            price = cities[key].poltava;
            break;
          case "kyiv":
            price = cities[key].kyiv;
            break;
        }

        let block = `<div class="services__section">
            <div class="row services_row">
              <p class="services__title-price col-9">${cities[key].title}</p>
              <p class="services__number services__number-2 col-3">${price}</p>
              <p class="services__subtitle col-12">${cities[key].subtitle}</p>
            </div>
          </div>`;

        $(block).appendTo(".services__wrapper");
      }
    });
    //REGISTRATION
    $(".services__button-reg").click(function(e) {
      let passOne = $(".input-pass-reg"),
        passTwo = $(".input-pass_again-reg");

      $(passTwo).removeClass("error-val");

      if (passTwo.val() == passOne.val()) {
        $(passTwo).removeClass("error-val");
      } else {
        $(passTwo).addClass("error-val");
        return;
      }

      $(".registr__hidden").click();

      localStorage.setItem("phone", $(".input-phone-reg").val());
      localStorage.setItem("pass", $(".input-pass-reg").val());

      //$(".forms__tab-login").click();
    });
    //LOGIN
    $(".services__button-log").click(function() {
      let storedPhone = localStorage.getItem("phone");
      let storedPass = localStorage.getItem("pass");

      let userPhone = $(".input-phone").val();
      let userPass = $(".input-pass").val();

      $(".input-phone").removeClass("error-val");
      $(".input-pass").removeClass("error-val");

      if (userPhone == storedPhone && userPass == storedPass) {
        window.location.href = "account.html";
      } else if (userPhone != storedPhone && userPass != storedPass) {
        $(".input-phone").addClass("error-val");
        $(".input-pass").addClass("error-val");
      } else if (userPhone != storedPhone) {
        $(".input-phone").addClass("error-val");
      } else if (userPass != storedPass) {
        $(".input-pass").addClass("error-val");
      }
    });
  });
})(jQuery);

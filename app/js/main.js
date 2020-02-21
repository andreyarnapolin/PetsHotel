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
        autoUpdateInput: false,
        minDate: moment().add(1, "days"),
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
        }
        //startDate: "20/02/2020",
        //endDate: "20/02/2020"
      },
      function(start, end) {
        daysNumber =
          (Math.abs(moment(start).diff(moment(end), "days")) + 1) * 150;

        $(".order__amount").text(daysNumber);
        callback();
      }
    );

    $(".order__date-input").on("apply.daterangepicker", function(ev, picker) {
      $(this).val(
        picker.startDate.format("DD/MM/YYYY") +
          " - " +
          picker.endDate.format("DD/MM/YYYY")
      );
    });

    $(".order__date-input").on("cancel.daterangepicker", function(ev, picker) {
      daysNumber = 0;
      $(".order__amount").text(daysNumber);
      callback();
      $(this).val("Обрати дату*");
    });

    //$(".order__date-input").val("");
    //$(".order__date-input").attr("placeholder", "Оберіть дату");

    //FORM PRICE CALCULATION
    $(".order__form").on("click", ".order__check", function() {
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
            poltava: "350 грн",
            kyiv: "500 грн",
            title: "Грумінг",
            subtitle: "Миття"
          },
          service2: {
            poltava: "450 грн",
            kyiv: "600 грн",
            title: "Грумінг",
            subtitle: "Стрижка"
          },
          service3: {
            poltava: "250 грн",
            kyiv: "300 грн",
            title: "Грумінг",
            subtitle: "Чистка зубів"
          },
          service4: {
            poltava: "550 грн",
            kyiv: "700 грн",
            title: "Огляд ветеринара",
            subtitle: "Загальний"
          },
          service5: {
            poltava: "650 грн",
            kyiv: "800 грн",
            title: "Огляд ветеринара",
            subtitle: "Детальний"
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
        passTwo = $(".input-pass_again-reg"),
        name = $(".input-name-reg"),
        email = $(".input-email-reg"),
        phone = $(".input-phone-reg"),
        regCheck = true;

      $(passTwo).removeClass("error-val");

      if (passTwo.val() == passOne.val()) {
        $(passTwo).removeClass("error-val");
      } else {
        $(passTwo).addClass("error-val");
        return;
      }

      let empty = false;
      $("form#signup :input").each(function() {
        if ($(this).val() == "") {
          empty = true;
          return false;
        }
      });

      if (empty == false) {
        localStorage.setItem("phone", phone.val());
        localStorage.setItem("pass", passOne.val());
        localStorage.setItem("check", regCheck);
      }
      $(".registr__hidden").click();

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
        //let regCheck = true;
        //localStorage.setItem("check", regCheck);
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
    //ORDER FORM CITY SELECTION
    $("#order__city").change(function() {
      let groom = {
          service1: {
            poltava: "350",
            kyiv: "500",
            title: "Грумінг",
            subtitle: "Миття"
          },
          service2: {
            poltava: "450",
            kyiv: "600",
            title: "Грумінг",
            subtitle: "Стрижка"
          },
          service3: {
            poltava: "250",
            kyiv: "300",
            title: "Грумінг",
            subtitle: "Чистка зубів"
          }
        },
        doctor = {
          service1: {
            poltava: "550",
            kyiv: "700",
            title: "Огляд ветеринара",
            subtitle: "Загальний"
          },
          service2: {
            poltava: "650",
            kyiv: "800",
            title: "Огляд ветеринара",
            subtitle: "Детальний"
          }
        },
        selectedCity = $(this)
          .children("option:selected")
          .val();

      $(".order__option-remove").remove();
      $(".order__total").text("Всього " + daysNumber + " грн.");
      for (let key in groom) {
        let priceGroom;
        switch (selectedCity) {
          case "poltava":
            priceGroom = groom[key].poltava;
            break;
          case "kyiv":
            priceGroom = groom[key].kyiv;
            break;
        }

        let blockGroom = `<div class="order__option order__option-remove">
          <label class="order__checkname"
            >${groom[key].subtitle}
            <input type="checkbox" value="${priceGroom}" class="order__check" />
            <span class="order__checkmark"></span>
          </label>
        </div>`;

        $(blockGroom).appendTo(".order__options");
      }
      for (let key in doctor) {
        let priceDoctor;
        switch (selectedCity) {
          case "poltava":
            priceDoctor = doctor[key].poltava;
            break;
          case "kyiv":
            priceDoctor = doctor[key].kyiv;
            break;
        }
        let blockDoctor = `<div class="order__option order__option-remove">
        <label class="order__checkname"
          >${doctor[key].subtitle}
          <input type="checkbox" value="${priceDoctor}" class="order__check" />
          <span class="order__checkmark"></span>
        </label>
      </div>`;

        $(blockDoctor).appendTo(".order__doctor");
      }
    });
    //ORDER FORM NEXT/SUBMIT BUTTON
    $(".order__next-first").click(function() {
      if ($(".order__date-input").val() === "Обрати дату*") {
        return;
      } else {
        $(".order__fieldset-one").removeAttr("disabled");
        $(".order__block-one").addClass("order__none");
        $(".order__block-two").removeClass("order__none");
      }
    });
    $(".order__next-second").click(function() {
      if (
        $(".order__two-2").val() === "" ||
        $(".order__two-3").val() === "" ||
        $(".order__two-4").val() !== "right"
      ) {
        return;
      } else {
        $(".order__fieldset-two").removeAttr("disabled");
        $(".order__block-two").addClass("order__none");
        $(".order__block-three").removeClass("order__none");
      }
    });
    $(".order__submit").click(function() {
      let date = $(".order__date-input")
        .data("daterangepicker")
        .startDate.format("DD-MM");

      let modal = `<div class="winmod">
          <div class="winmod-block">
            <p class="winmod-title">Ваше бронювання</p>
            <p class="winmod-text">
              Ваше замовлення отримано! Чекаємо на Вас та вашого вихованця ${date} в
              будь-який зручний для Вас час.
            </p>
            <a href="#" class="winmod__link">OK <i class="icon-paw"></i></a>
            </div>
          <div class="winmod-catbox">
          <img class="winmod-cat" src="images/order_cat.jpg" alt="order__cat" />
          </div>
          </div>`,
        modalOverlay = document.createElement("div");

      modalOverlay.className = "winmod-overlay";

      // document.body.append(modalOverlay);

      if (
        $(".order__three-1").val() === "" ||
        $(".order__three-2").val() === ""
      ) {
        return;
      } else {
        $(modalOverlay).appendTo("body");
        $(modal).appendTo("body");
      }

      $(".winmod__link").click(function reviewClose() {
        modalOverlay.remove();
        $("winmod").remove();
        window.location.href = "index.html";
      });
    });
    //REGISTRATION CHECK
    $(".registration__check").click(function() {
      let validate = localStorage.getItem("check");
      if (!validate) {
        window.location.href = "registr.html";
      } else {
        window.location.href = "order.html";
      }
    });
    $(".menu__link-link").click(function() {
      let validate = localStorage.getItem("check");
      if (validate == "true") {
        window.location.href = "account.html";
      } else {
        window.location.href = "registr.html";
      }
    });
  });
})(jQuery);

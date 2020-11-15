import "../styles/index.scss";
import $ from "jquery";

import {
  Tutorial1,
  Tutorial2,
  Tutorial3,
  Tutorial4,
  Tutorial5,
  Tutorial6,
  Tutorial7,
  Tutorial8,
} from "./tutorials";

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}

/* Navigation - Start */
$(".navigation__list__item").click(function () {
  $(".navigation__list__item").each(function () {
    let dataId = $(this).attr("data-id");
    $(".tutorial__item[data-id='" + dataId + "']").hide();
    $(this).removeClass("navigation__list__item--active");
  });
  $(this).addClass("navigation__list__item--active");
  $(".tutorial__item[data-id='" + $(this).attr("data-id") + "']").fadeIn();
  startTutorial($(this).attr("data-id"));
});
/* Navigation - End */
startTutorial(0);

function startTutorial(id) {
  $("canvas").each(function () {
    $(this).remove();
  });
  switch (id) {
    case "1":
      Tutorial1();
      break;
    case "2":
      Tutorial2();
      break;
    case "3":
      Tutorial3();
      break;
    case "4":
      Tutorial4();
      break;
    case "5":
      Tutorial5();
      break;
    case "6":
      Tutorial6();
      break;
    case "7":
      Tutorial7();
      break;
    case "8":
      Tutorial8();
      break;
    default:
      Tutorial1();
  }
}

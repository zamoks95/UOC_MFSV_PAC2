"use strict";

require("../styles/index.scss");

var _jquery = _interopRequireDefault(require("jquery"));

var _tutorials = require("./tutorials");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}
/* Navigation - Start */


(0, _jquery["default"])(".navigation__list__item").click(function () {
  (0, _jquery["default"])(".navigation__list__item").each(function () {
    var dataId = (0, _jquery["default"])(this).attr("data-id");
    (0, _jquery["default"])(".tutorial__item[data-id='" + dataId + "']").hide();
    (0, _jquery["default"])(this).removeClass("navigation__list__item--active");
  });
  (0, _jquery["default"])(this).addClass("navigation__list__item--active");
  (0, _jquery["default"])(".tutorial__item[data-id='" + (0, _jquery["default"])(this).attr("data-id") + "']").fadeIn();
  startTutorial((0, _jquery["default"])(this).attr("data-id"));
});
/* Navigation - End */

startTutorial(0);

function startTutorial(id) {
  (0, _jquery["default"])("canvas").each(function () {
    (0, _jquery["default"])(this).remove();
  });

  switch (id) {
    case "1":
      (0, _tutorials.Tutorial1)();
      break;

    case "2":
      (0, _tutorials.Tutorial2)();
      break;

    case "3":
      (0, _tutorials.Tutorial3)();
      break;

    case "4":
      (0, _tutorials.Tutorial4)();
      break;

    case "5":
      (0, _tutorials.Tutorial5)();
      break;

    case "6":
      (0, _tutorials.Tutorial6)();
      break;

    case "7":
      (0, _tutorials.Tutorial7)();
      break;

    case "8":
      (0, _tutorials.Tutorial8)();
      break;

    default:
      (0, _tutorials.Tutorial1)();
  }
}
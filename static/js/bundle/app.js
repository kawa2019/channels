"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.addEventListener('DOMContentLoaded', function (event) {
  var mainContent = document.querySelector(".wrapper__main");

  var inputs_to_clear_radio = _toConsumableArray(document.querySelectorAll(".choice--radio"));

  var dataGlobal = [];
  var executed_title = false;
  var executed_sub = false;
  var executed_vid = false;
  var executed_view = false;

  var clear_inputs = function clear_inputs() {
    inputs_to_clear_radio.map(function (input_radio) {
      input_radio.checked = false;
    });
  }; //sort by select


  var sort_select = function sort_select(data, x, y) {
    if (typeof y !== "undefined") {
      data.sort(function (a, b) {
        return +numberWithCommas(a[x][y]).replace(/\,/g, "") - +numberWithCommas(b[x][y]).replace(/\,/g, "");
      });
    } else {
      data.sort(function (a, b) {
        if (a[x].toLowerCase() < b[x].toLowerCase()) {
          return -1;
        }

        if (a[x].toLowerCase() > b[x].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    }
  }; //filter by search


  var filter_by_search = function filter_by_search(data) {
    var input_to_search = document.querySelector(".filter__input");
    input_to_search.addEventListener("change", function () {
      mainContent.innerHTML = "";
      var data_filter = data.filter(function (channel) {
        var is_there = channel.title.toLowerCase().includes(input_to_search.value.toLowerCase());

        if (is_there) {
          return channel;
        }
      });
      console.log(data_filter);
      one_channel(data_filter);
    });
  }; //adding sort function to input select 


  var check_input_sort = function check_input_sort(data) {
    var inputs_to_sort = _toConsumableArray(document.querySelectorAll(".choice__label"));

    inputs_to_sort.map(function (input, index) {
      if (index === 0) {
        var btn_sort = document.querySelector("label[for=".concat(input.htmlFor, "]"));
        btn_sort.addEventListener("click", function () {
          if (!executed_title) {
            mainContent.innerHTML = "";
            executed_title = true;
            executed_vid = false;
            executed_sub = false;
            executed_view = false;
            sort_select(data, "title");
            one_channel(data);
          } else {
            return;
          }
        });
      } else {
        var _btn_sort = document.querySelector("label[for=".concat(input.htmlFor, "]"));

        _btn_sort.addEventListener("click", function () {
          if (index == 1 && !executed_sub) {
            mainContent.innerHTML = "";
            executed_sub = true;
            executed_vid = false;
            executed_title = false;
            executed_view = false;
            sort_select(data, "statistics", "subscriberCount");
            one_channel(data);
          } else if (index == 2 && !executed_vid) {
            mainContent.innerHTML = "";
            executed_vid = true;
            executed_sub = false;
            executed_view = false;
            executed_title = false;
            sort_select(data, "statistics", "videoCount");
            one_channel(data);
          } else if (index === 3 && !executed_view) {
            mainContent.innerHTML = "";
            executed_view = true;
            executed_sub = false;
            executed_vid = false;
            executed_title = false;
            sort_select(data, "statistics", "viewCount");
            one_channel(data);
          }
        });
      }
    });
  };

  var numberWithCommas = function numberWithCommas(x) {
    if (typeof x !== "undefined") return x.toString().replace(" ", "").replace(/\./g, "").replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }; //body one channel


  var html = function html(link_to_channel, logo, channel_title, num_sub, num_vid, num_view) {
    return "\n<a href=".concat(link_to_channel, " class=\"logo\" style=\"background-image: url(").concat(logo, ")\">\n</a>\n<h2 class=\"channel_title\">").concat(channel_title, "</h2>\n<div class=\"all_numbers\">\n    <p class=\"numbers\">\n        <span class=\"sub_vid_view\">SUBSCRIBERS:</span>\n        <span class=\"num_sub_vid_view\">").concat(numberWithCommas(num_sub), "</span>\n    </p>\n    <p class=\"numbers\">\n        <span class=\"sub_vid_view\">VIDEOS:</span>\n        <span class=\"num_sub_vid_view\">").concat(numberWithCommas(num_vid), "</span>\n    </p>\n    <p class=\"numbers\">\n        <span class=\"sub_vid_view\">VIEWS:</span>\n        <span class=\"num_sub_vid_view\">").concat(numberWithCommas(num_view), "</span>\n    </p>\n</div>\n");
  }; //create one channel  


  var one_channel = function one_channel(data) {
    data.map(function (channel) {
      var param_html = [channel.customUrl, channel.thumbnails.medium.url, channel.title, channel.statistics.subscriberCount, channel.statistics.videoCount, channel.statistics.viewCount];
      var newArt = document.createElement("article");
      newArt.classList.add("channel");
      newArt.innerHTML = html.apply(void 0, param_html);
      mainContent.appendChild(newArt);
    });
  }; //fetch data


  var getChannels = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var response, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch("http://localhost:4000/channels");

            case 3:
              response = _context.sent;

              if (!response.ok) {
                _context.next = 13;
                break;
              }

              _context.next = 7;
              return response.json();

            case 7:
              data = _context.sent;
              console.log(data);
              dataGlobal.push.apply(dataGlobal, _toConsumableArray(data));
              one_channel(data);
              _context.next = 14;
              break;

            case 13:
              throw "404 not found";

            case 14:
              _context.next = 21;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              alert(_context.t0);
              console.log(_context.t0);
              mainContent.innerText = "Problem is " + _context.t0;

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 16]]);
    }));

    return function getChannels() {
      return _ref.apply(this, arguments);
    };
  }();

  getChannels(check_input_sort(dataGlobal), filter_by_search(dataGlobal));
});
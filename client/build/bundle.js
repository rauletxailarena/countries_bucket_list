/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var countries = __webpack_require__(1)
var requestHelper = __webpack_require__(4)
var makeFormWork = __webpack_require__(3);
var renderList = __webpack_require__(2);

window.addEventListener("load", function(){

  makeFormWork()

  requestHelper.getRequest("http://localhost:3000/api/countries",
  function(countries){
    renderList(countries);
  })

  countries.getCountries();
})


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var countries = {
  url: "https://restcountries.eu/rest/v2/all",
  getCountries: function(){
    var request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.addEventListener("load", function(){

      var countries = JSON.parse(request.responseText)
      var select = document.getElementById("country-name-select")

      countries.forEach(function(country) {
        var countryOption = document.createElement("option");
        countryOption.innerHTML = country.name;
        select.appendChild(countryOption);
      })
    })
    request.send();
  }
}

module.exports = countries;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var renderList = function(countries){
  var mainDiv = document.querySelector("#main-div");

  mainDiv.innerHTML = "";

  var list = document.createElement("list");

  countries.forEach(function(country){
    var listItem = document.createElement("li")

    listItem.innerText = country.country_name;

    list.appendChild(listItem)
  })
  mainDiv.appendChild(list);
}

module.exports = renderList;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(4);
var renderList = __webpack_require__(2);

var onSubmit = function(event){
  event.preventDefault();
  var select = document.getElementById("country-name-select")
  console.log(select.value);

  var country = {
    country_name: select.value
  }

  requestHelper.postRequest(
    "http://localhost:3000/api/countries",
    function(result){
      console.log("Responding to post request", result)
      renderList(result)
    },
    country
  )

}

var makeFormWork = function(){
  var form = document.querySelector("#new-country")

  form.addEventListener("submit", onSubmit)
}

module.exports = makeFormWork;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var requestHelper = {
  getRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url)

    request.addEventListener("load", function(){
      var jsonString = request.responseText;
      var data = JSON.parse(jsonString);
      callback(data)
    })
    request.send();
  },

  postRequest: function(url, callback, payload){
    var request = new XMLHttpRequest();
    request.open("POST", url)

    request.setRequestHeader("Content-Type", "application/json")

    request.addEventListener("load", function(){
      if (request.status != 200) return
      var jsonString = request.responseText;
      var data = JSON.parse(jsonString)
      callback(data)
    })

    var jsonString = JSON.stringify(payload);

    request.send(jsonString)
  }

}

module.exports = requestHelper;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
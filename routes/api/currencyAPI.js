import currencycodes from "./currencycodes.json";

//User login inputs
var location = ""; //Internship location
var home = ""; //Home location

//something to convert above into currency symbols???
for(let i = 0; i < currencycodes.length; i++) {
  if location === currencycodes.country[i] {
    localcurr = currencycodes.currency_code[i];
  };
  if home === currencycodes.country[i] {
    homecurr=currencycodes.currency_code[i];
  }
};
var homecurr = "" //home variable converted
var localcurr= "" //intership location variable converted
var API_KEY="e6bfdc7723cafd3ed87781ed33af07c3";

var queryURL = "http://data.fixer.io/api/latest?access_key="+ API_KEY +"&base="+ homecurr +"&symbols="+
 localcurr +"callback=MY_FUNCTION";
$.ajax({
  url: queryURL,
  datatType: "jsonp",
  success: function(json) {
    //exchange rate data is stored in json.rates
    alert(json.rates.GBP);
    //base currency is stored in json.base
    alert(json.base);
    //timestamp can be accessed in json.timestamp
    alert(json.timestamp);
  }
}).done(function(response) {

    var currentRate = parseLodash(response);
    if (_.isError(event)) {
      console.log('Error parsing JSON:', currentRate);
    }





    //Find Longitude and Latitude of the event
    // eventLat[i] = parseLodash(response).events.event[i].latitude;
    // if (_.isError(eventLat[i])) {
    //   console.log('Error parsing JSON:', eventLat[i]);
    // }
    // eventLat.push(eventLat[i]);
    // eventLng[i] = parseLodash(response).events.event[i].longitude;
    // if (_.isError(eventLng[i])) {
    //   console.log('Error parsing JSON:', eventLng[i]);
    // }
    // eventLng.push(eventLng[i]);
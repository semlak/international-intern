import axios from "axios";
import currencycodes from "./currencycodes.json";

//User login inputs
var location = ""; //Internship location
var home = ""; //Home location

//something to convert above into currency symbols???
for(let i = 0; i < currencycodes.length; i++) {
  if (location === currencycodes.country[i]) {
    localcurr = currencycodes.currency_code[i];
  };
  if (home === currencycodes.country[i]) {
    homecurr=currencycodes.currency_code[i];
  }
};
let homecurr = "" //home variable converted
let localcurr= "" //intership location variable converted
const API_KEY="e6bfdc7723cafd3ed87781ed33af07c3";


let queryURL = "http://data.fixer.io/api/latest?access_key="+ API_KEY +"&base="+ homecurr +"&symbols="+
 localcurr +"callback=MY_FUNCTION";

//axios get function
function getCurrency() {
	axios.get(queryURL)
	.then(function(json) {
		//exchange rate data is stored in json.rates
	    alert(json.rates.GBP);
	    //base currency is stored in json.base
	    alert(json.base);
	    //timestamp can be accessed in json.timestamp
	    alert(json.timestamp);
	})
	.catch(function(error) {

	})
}


//AJAX call from Fixer.io documentation
// $.ajax({
//   url: queryURL,
//   datatType: "jsonp",
//   success: function(json) {
//     //exchange rate data is stored in json.rates
//     alert(json.rates.GBP);
//     //base currency is stored in json.base
//     alert(json.base);
//     //timestamp can be accessed in json.timestamp
//     alert(json.timestamp);
//   }
// });


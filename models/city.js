/*jshint node: true */
'use strict';

var mongoose = require('mongoose');
var request = require('superagent');

var citySchema = mongoose.Schema({
  cityName: String, //example: Seattle,wa
  temperature: Number,
  lastPull: Date,
  users: []
});

citySchema.methods.pullCities = function(){
  this.model('City').find({"cityName": "Seattle,wa"}, function (err, data) {
    if (err) return console.log('DB city get all city error.'); console.log(data);
    // var parsedData = JSON.parse(data.text);
    var cities = (data.cityName);
    console.log(cities)

    var cityCall = [];
    data.forEach(function(city){
      var tempParse;
      var temp;
      var cityUrl = 'api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&cnt=3&units=imperial&APIID=20e5bcdd87db0f48d21c0e8d85d30048&mode=json';
      console.log(2)
      request
        .get(cityUrl)
        .end (function(err, cityData) {
          console.log(cityData)
          if (err) console.log('there was an error');
          tempParse = JSON.parse(cityData.text);
          temp = res.json(tempParse.list[2].temp.night);
          return temp;
        });
        console.log(temp)
      if (temp <= 32){
        cityCall.push(city.users);
      }

      return cityCall;
    });
  });
};


module.exports = mongoose.model('City', citySchema);


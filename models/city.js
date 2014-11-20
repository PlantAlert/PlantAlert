/*jshint node: true */
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var request = require('superagent');
var bodyParser = require('body-parser');
var notify = require('../lib/notify');

var citySchema = mongoose.Schema({
  cityName: String,
  users: []
});





citySchema.methods.pullCities = function(){

  this.model('City').find({}, function(err, data) {
    if (err) return console.log('DB city get all city error.');

    data.forEach(function(city) {

      if(city.users !== null) {

        var weatherForCity = function(city) {
          var tempParse;
          var temp;
          var cityUrl = 'api.openweathermap.org/data/2.5/forecast/daily?q=' + city.cityName + '&cnt=3&units=imperial&APIID=' + process.env.ENVOPENWEATHER + '&mode=json';

          request
            //.timeout(15000)
            .get(cityUrl)
            .end (function(err, cityData) {
              if (err) console.log('there was an error');
              tempParse = JSON.parse(cityData.text);
              temp = (tempParse.list[2].temp.night);
              if (temp <= 32) notify(city);
            });
        };

        weatherForCity(city);
      }
    });
  });
};


module.exports = mongoose.model('City', citySchema);


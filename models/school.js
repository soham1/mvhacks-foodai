'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var School = new Schema({
    name : String,
    menuUrl: String,
    forumUrl: String, 
    overallSentiment: Number
});

module.exports = mongoose.model('School', School);
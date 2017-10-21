'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
    imageUrl: String,
    foodList: [{type: String}],
    schoolId: {type: Schema.Types.ObjectId, ref: 'School'},
    dateCreated: {type: Date, default: Date.now} 
});

module.exports = mongoose.model('Image', Image);
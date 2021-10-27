const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');

const peopleSchema = mongoose.Schema(
  {
    pid: {
      type: String,
      required: true,
      trim: true,
    },
    pname: {
      type: String,
      required: true,
      trim: true,
    },
    sex: {
      type: Number,
      require: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
peopleSchema.plugin(toJSON);
peopleSchema.plugin(paginate);



/**
 * @typedef People
 */
const People = mongoose.model('People', peopleSchema);

module.exports = People;

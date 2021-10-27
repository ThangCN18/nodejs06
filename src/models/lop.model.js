const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');

const lopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tso: {
      type: Number,
      require: true,
    },
    gvcn: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
lopSchema.plugin(toJSON);
lopSchema.plugin(paginate);



/**
 * @typedef Lop
 */
const Lop = mongoose.model('Lop', lopSchema);

module.exports = Lop;

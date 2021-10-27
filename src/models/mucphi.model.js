const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');

const mucphiSchema = mongoose.Schema(
  {
    mamp: {
      type: String,
      required: true,
      trim: true,
    },
    dongia: {
      type: Number,
      require: true,
    },
    mota: {
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
mucphiSchema.plugin(toJSON);
mucphiSchema.plugin(paginate);



/**
 * @typedef Mucphi
 */
const Mucphi = mongoose.model('Mucphi', mucphiSchema);

module.exports = Mucphi;

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');

const dongxeSchema = mongoose.Schema(
  {
    dongxe: {
      type: String,
      required: true,
      trim: true,
    },
    hangxe: {
      type: String,
      required: true,
      trim: true,
    },
    songuoingoi: {
      type: Number,
      require: true,
    },
   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dongxeSchema.plugin(toJSON);
dongxeSchema.plugin(paginate);



/**
 * @typedef Dongxe
 */
const Dongxe = mongoose.model('Dongxe', dongxeSchema);

module.exports = Dongxe;

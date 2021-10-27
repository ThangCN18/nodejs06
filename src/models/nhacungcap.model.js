const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');

const nhacungcapSchema = mongoose.Schema(
    {
      manhacc: {
        type: String,
        required: true,
        trim: true,
      },
      tennhacc: {
        type: String,
        required: true,
        trim: true,
      },
      diachi: {
        type: String,
        required: true,
        trim: true,
      },
      sodt: {
        type: String,
        required: true,
        trim: true,
      },
      masothue: {
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
  nhacungcapSchema.plugin(toJSON);
  nhacungcapSchema.plugin(paginate);
  /**
 * @typedef Nhacungcap
 */
const Nhacungcap = mongoose.model('Nhacungcap', nhacungcapSchema);

module.exports = Nhacungcap;

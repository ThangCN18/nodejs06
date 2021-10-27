const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');

const loaidvSchema = mongoose.Schema(
  {
    maloaidv: {
      type: String,
      required: true,
      trim: true,
    },
    
    tenloaidv: {
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
loaidvSchema.plugin(toJSON);
loaidvSchema.plugin(paginate);



/**
 * @typedef Loaidv
 */
const Loaidv = mongoose.model('Loaidv', loaidvSchema);

module.exports = Loaidv;

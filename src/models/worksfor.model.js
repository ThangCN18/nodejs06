const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');

const worksforSchema = mongoose.Schema(
  {
    dateofjoin: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      require: true,
    },
   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
worksforSchema.plugin(toJSON);
worksforSchema.plugin(paginate);



/**
 * @typedef Worksfor
 */
const Worksfor = mongoose.model('Worksfor', worksforSchema);

module.exports = Worksfor;

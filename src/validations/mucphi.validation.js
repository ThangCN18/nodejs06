const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createMucphi = {
  body: Joi.object().keys({
    
    mamp: Joi.string().required().trim(),
    dongia: Joi.number().required(),
    mota: Joi.string().required().trim(),

  }),
};

const getMucphis = {
  query: Joi.object().keys({
    mamp: Joi.string(),
    dongia: Joi.number(),
    mota: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMucphi = {
  params: Joi.object().keys({
    mucphiId: Joi.string().custom(objectId),
  }),
};

const updateMucphi = {
  params: Joi.object().keys({
    mucphiId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      mamp: Joi.string().required().trim(),
      dongia: Joi.number().required(),
      mota: Joi.string().required().trim(),
    })
    .min(1),
};

const deleteMucphi = {
  params: Joi.object().keys({
    mucphiId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMucphi,
  getMucphis,
  getMucphi,
  updateMucphi,
  deleteMucphi,
};

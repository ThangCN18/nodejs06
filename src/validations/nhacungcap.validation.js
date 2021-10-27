const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createNhacungcap = {
  body: Joi.object().keys({
    
    manhacc: Joi.string().required().trim(),
    tennhacc: Joi.string().required().trim(),
    diachi: Joi.string().required().trim(),
    sodt: Joi.string().required().trim(),
    masothue: Joi.string().required().trim(),

  }),
};

const getNhacungcaps = {
  query: Joi.object().keys({
    manhacc: Joi.string(),
    tennhacc: Joi.string(),
    diachi: Joi.string(),
    sodt: Joi.string(),
    masothue: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getNhacungcap = {
  params: Joi.object().keys({
    nhacungcapId: Joi.string().custom(objectId),
  }),
};

const updateNhacungcap = {
  params: Joi.object().keys({
    nhacungcapId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      manhacc: Joi.string().required().trim(),
      tennhacc: Joi.string().required().trim(),
      diachi: Joi.string().required().trim(),
      sodt: Joi.string().required().trim(),
      masothue: Joi.string().required().trim(),
    })
    .min(1),
};

const deleteNhacungcap = {
  params: Joi.object().keys({
    nhacungcapId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNhacungcap,
  getNhacungcaps,
  getNhacungcap,
  updateNhacungcap,
  deleteNhacungcap,
};

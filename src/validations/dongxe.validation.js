const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createDongxe = {
  body: Joi.object().keys({
    
    dongxe: Joi.string().required().trim(),
    hangxe: Joi.string().required().trim(),
    songuoingoi: Joi.number().required(),
   

  }),
};

const getDongxes = {
  query: Joi.object().keys({
    dongxe: Joi.string(),
    hangxe: Joi.string(),
    songuoingoi: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDongxe = {
  params: Joi.object().keys({
    dongxeId: Joi.string().custom(objectId),
  }),
};

const updateDongxe = {
  params: Joi.object().keys({
    dongxeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      dongxe: Joi.string().required().trim(),
      hangxe: Joi.string().required().trim(),
      songuoingoi: Joi.number().required(),
    })
    .min(1),
};

const deleteDongxe = {
  params: Joi.object().keys({
    dongxeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDongxe,
  getDongxes,
  getDongxe,
  updateDongxe,
  deleteDongxe,
};

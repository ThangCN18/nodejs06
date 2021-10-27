const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createloaidv = {
  body: Joi.object().keys({
    
    maloaidv: Joi.string().required().trim(),
    tenloaidv: Joi.string().required().trim(),

  }),
};

const getloaidvs = {
  query: Joi.object().keys({
    maloaidv: Joi.string(),
    tenloaidv: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getloaidv = {
  params: Joi.object().keys({
    loaidvId: Joi.string().custom(objectId),
  }),
};

const updateloaidv = {
  params: Joi.object().keys({
    loaidvId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      maloaidv: Joi.string().required().trim(),
      tenloaidv: Joi.string().required().trim(),
    })
    .min(1),
};

const deleteloaidv = {
  params: Joi.object().keys({
    loaidvId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createloaidv,
  getloaidvs,
  getloaidv,
  updateloaidv,
  deleteloaidv,
};

const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCompanies = {
  body: Joi.object().keys({
    cid: Joi.string().required().trim(),
    cname: Joi.string().required().trim(),
    address: Joi.string().required().trim(),

  }),
};

const getCompaniess = {
  query: Joi.object().keys({
    cid: Joi.string(),
    cname: Joi.string(),
    address: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCompanies = {
  params: Joi.object().keys({
    companiesId: Joi.string().custom(objectId),
  }),
};

const updateCompanies = {
  params: Joi.object().keys({
    companiesId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      cid: Joi.string().required().trim(),
      cname: Joi.string().required().trim(),
      address: Joi.string().required().trim(),
    })
    .min(1),
};

const deleteCompanies = {
  params: Joi.object().keys({
    companiesId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCompanies,
  getCompaniess,
  getCompanies,
  updateCompanies,
  deleteCompanies,
};

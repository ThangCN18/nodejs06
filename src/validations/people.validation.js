const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createPeople = {
  body: Joi.object().keys({
    
    pid: Joi.string().required().trim(),
    pname: Joi.string().required().trim(),
    sex: Joi.number().required(),
    dob: Joi.date().required(),
    phone: Joi.string().required().trim(),
    address: Joi.string().required().trim(),

  }),
};

const getPeoples = {
  query: Joi.object().keys({
    pid: Joi.string(),
    pname: Joi.string(),
    sex: Joi.number(),
    dob: Joi.date(),
    phone: Joi.string(),
    address: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPeople = {
  params: Joi.object().keys({
    peopleId: Joi.string().custom(objectId),
  }),
};

const updatePeople = {
  params: Joi.object().keys({
    peopleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      pid: Joi.string().required().trim(),
      pname: Joi.string().required().trim(),
      sex: Joi.number().required(),
      dob: Joi.date().required(),
      phone: Joi.string().required().trim(),
      address: Joi.string().required().trim(),
    })
    .min(1),
};

const deletePeople = {
  params: Joi.object().keys({
    peopleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPeople,
  getPeoples,
  getPeople,
  updatePeople,
  deletePeople,
};

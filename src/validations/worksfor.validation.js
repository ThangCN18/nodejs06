const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createWorksfor = {
  body: Joi.object().keys({
    
    dateforjoin: Joi.date().required(),
    salary: Joi.number().required(),
  

  }),
};

const getWorksfors = {
  query: Joi.object().keys({
    dateforjoin: Joi.date(),
    salary: Joi.number(),
  
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getWorksfor = {
  params: Joi.object().keys({
    worksforId: Joi.string().custom(objectId),
  }),
};

const updateWorksfor = {
  params: Joi.object().keys({
    worksforId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      dateforjoin: Joi.date().required(),
      salary: Joi.number().required(),
    
    })
    .min(1),
};

const deleteWorksfor = {
  params: Joi.object().keys({
    worksforId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createWorksfor,
  getWorksfors,
  getWorksfor,
  updateWorksfor,
  deleteWorksfor,
};

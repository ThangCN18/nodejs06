const httpStatus = require('http-status');
const { Professional } = require('../models');
const ApiError = require('../utils/ApiError');


const createProfessional = async (professionalBody) => {
  if (await Professional.isEmailTaken(professionalBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Professional.create(professionalBody);
};


const queryProfessionals = async (filter, options) => {
  const professionals = await Professional.paginate(filter, options);
  return professionals;
};


const getProfessionalById = async (id) => {
  return Professional.findById(id);
};




const updateProfessionalById = async (professionalId, updateBody) => {
  const professional = await getProfessionalById(professionalId);
  if (!professional) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Professional not found');
  }
  if (updateBody.email && (await Professional.isEmailTaken(updateBody.email, professionalId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(professional, updateBody);
  await professional.save();
  return professional;
};


const deleteProfessionalById = async (professionalId) => {
  const professional = await getProfessionalById(professionalId);
  if (!professional) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Professional not found');
  }
  await professional.remove();
  return professional;
};

module.exports = {
  createProfessional,
  queryProfessionals,
  getProfessionalById,
  updateProfessionalById,
  deleteProfessionalById,
};

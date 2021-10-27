const httpStatus = require('http-status');
const { Mucphi } = require('../models');
const ApiError = require('../utils/ApiError');


const createMucphi = async (mucphiBody) => {
  if (await Mucphi.isEmailTaken(mucphiBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Mucphi.create(mucphiBody);
};


const queryMucphis = async (filter, options) => {
  const mucphis = await Mucphi.paginate(filter, options);
  return mucphis;
};


const getMucphiById = async (id) => {
  return Mucphi.findById(id);
};




const updateMucphiById = async (mucphiId, updateBody) => {
  const mucphi = await getMucphiById(mucphiId);
  if (!mucphi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mucphi not found');
  }
  if (updateBody.email && (await Mucphi.isEmailTaken(updateBody.email, mucphiId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(mucphi, updateBody);
  await mucphi.save();
  return mucphi;
};


const deleteMucphiById = async (mucphiId) => {
  const mucphi = await getMucphiById(mucphiId);
  if (!mucphi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mucphi not found');
  }
  await mucphi.remove();
  return mucphi;
};

module.exports = {
  createMucphi,
  queryMucphis,
  getMucphiById,
  updateMucphiById,
  deleteMucphiById,
};

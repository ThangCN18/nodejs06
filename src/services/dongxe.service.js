const httpStatus = require('http-status');
const { Dongxe } = require('../models');
const ApiError = require('../utils/ApiError');


const createDongxe = async (dongxeBody) => {
  if (await Dongxe.isEmailTaken(dongxeBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Dongxe.create(dongxeBody);
};


const queryDongxes = async (filter, options) => {
  const dongxes = await Dongxe.paginate(filter, options);
  return dongxes;
};


const getDongxeById = async (id) => {
  return Dongxe.findById(id);
};




const updateDongxeById = async (dongxeId, updateBody) => {
  const dongxe = await getDongxeById(dongxeId);
  if (!dongxe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dongxe not found');
  }
  if (updateBody.email && (await Dongxe.isEmailTaken(updateBody.email, dongxeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(dongxe, updateBody);
  await dongxe.save();
  return dongxe;
};


const deleteDongxeById = async (dongxeId) => {
  const dongxe = await getDongxeById(dongxeId);
  if (!dongxe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dongxe not found');
  }
  await dongxe.remove();
  return dongxe;
};

module.exports = {
  createDongxe,
  queryDongxes,
  getDongxeById,
  updateDongxeById,
  deleteDongxeById,
};

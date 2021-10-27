const httpStatus = require('http-status');
const { Loaidv } = require('../models');
const ApiError = require('../utils/ApiError');


const createLoaidv = async (loaidvBody) => {
  if (await Loaidv.isEmailTaken(loaidvBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Loaidv.create(loaidvBody);
};


const queryLoaidvs = async (filter, options) => {
  const loaidvs = await Loaidv.paginate(filter, options);
  return loaidvs;
};


const getLoaidvById = async (id) => {
  return Loaidv.findById(id);
};




const updateLoaidvById = async (loaidvId, updateBody) => {
  const loaidv = await getLoaidvById(loaidvId);
  if (!loaidv) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loaidv not found');
  }
  if (updateBody.email && (await Loaidv.isEmailTaken(updateBody.email, loaidvId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(loaidv, updateBody);
  await loaidv.save();
  return loaidv;
};


const deleteLoaidvById = async (loaidvId) => {
  const loaidv = await getLoaidvById(loaidvId);
  if (!loaidv) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loaidv not found');
  }
  await loaidv.remove();
  return loaidv;
};

module.exports = {
  createLoaidv,
  queryLoaidvs,
  getLoaidvById,
  updateLoaidvById,
  deleteLoaidvById,
};

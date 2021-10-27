const httpStatus = require('http-status');
const { Lop } = require('../models');
const ApiError = require('../utils/ApiError');


const createLop = async (lopBody) => {
  if (await Lop.isEmailTaken(lopBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Lop.create(lopBody);
};


const queryLops = async (filter, options) => {
  const lops = await Lop.paginate(filter, options);
  return lops;
};


const getLopById = async (id) => {
  return Lop.findById(id);
};




const updateLopById = async (lopId, updateBody) => {
  const lop = await getLopById(lopId);
  if (!lop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lop not found');
  }
  if (updateBody.email && (await Lop.isEmailTaken(updateBody.email, lopId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(lop, updateBody);
  await lop.save();
  return lop;
};


const deleteLopById = async (lopId) => {
  const lop = await getLopById(lopId);
  if (!lop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lop not found');
  }
  await lop.remove();
  return lop;
};

module.exports = {
  createLop,
  queryLops,
  getLopById,
  updateLopById,
  deleteLopById,
};

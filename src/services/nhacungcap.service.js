const httpStatus = require('http-status');
const { Nhacungcap } = require('../models');
const ApiError = require('../utils/ApiError');


const createNhacungcap = async (nhacungcapBody) => {
  if (await Nhacungcap.isEmailTaken(nhacungcapBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Nhacungcap.create(nhacungcapBody);
};


const queryNhacungcaps = async (filter, options) => {
  const nhacungcaps = await Nhacungcap.paginate(filter, options);
  return nhacungcaps;
};


const getNhacungcapById = async (id) => {
  return Nhacungcap.findById(id);
};




const updateNhacungcapById = async (nhacungcapId, updateBody) => {
  const nhacungcap = await getNhacungcapById(nhacungcapId);
  if (!nhacungcap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhacungcap not found');
  }
  if (updateBody.email && (await Nhacungcap.isEmailTaken(updateBody.email, nhacungcapId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(nhacungcap, updateBody);
  await nhacungcap.save();
  return nhacungcap;
};


const deleteNhacungcapById = async (nhacungcapId) => {
  const nhacungcap = await getNhacungcapById(nhacungcapId);
  if (!nhacungcap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhacungcap not found');
  }
  await nhacungcap.remove();
  return nhacungcap;
};

module.exports = {
  createNhacungcap,
  queryNhacungcaps,
  getNhacungcapById,
  updateNhacungcapById,
  deleteNhacungcapById,
};

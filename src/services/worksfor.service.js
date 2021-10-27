const httpStatus = require('http-status');
const { Worksfor } = require('../models');
const ApiError = require('../utils/ApiError');


const createWorksfor = async (worksforBody) => {
  if (await Worksfor.isEmailTaken(worksforBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Worksfor.create(worksforBody);
};


const queryWorksfors = async (filter, options) => {
  const worksfors = await Worksfor.paginate(filter, options);
  return worksfors;
};


const getWorksforById = async (id) => {
  return Worksfor.findById(id);
};




const updateWorksforById = async (worksforId, updateBody) => {
  const worksfor = await getWorksforById(worksforId);
  if (!worksfor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Worksfor not found');
  }
  if (updateBody.email && (await Worksfor.isEmailTaken(updateBody.email, worksforId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(worksfor, updateBody);
  await worksfor.save();
  return worksfor;
};


const deleteWorksforById = async (worksforId) => {
  const worksfor = await getWorksforById(worksforId);
  if (!worksfor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Worksfor not found');
  }
  await worksfor.remove();
  return worksfor;
};

module.exports = {
  createWorksfor,
  queryWorksfors,
  getWorksforById,
  updateWorksforById,
  deleteWorksforById,
};

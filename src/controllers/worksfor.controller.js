const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { worksforService } = require('../services');

const createWorksfor = catchAsync(async (req, res) => {
  const worksfor = await worksforService.createWorksfor(req.body);
  res.status(httpStatus.CREATED).send(worksfor);
});

const getWorksfors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await worksforService.queryWorksfors(filter, options);
  res.send(result);
});

const getWorksfor = catchAsync(async (req, res) => {
  const worksfor = await worksforService.getWorksforById(req.params.worksforId);
  if (!worksfor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Worksfor not found');
  }
  res.send(worksfor);
});

const updateWorksfor = catchAsync(async (req, res) => {
  const worksfor = await worksforService.updateWorksforById(req.params.worksforId, req.body);
  res.send(worksfor);
});

const deleteWorksfor = catchAsync(async (req, res) => {
  await worksforService.deleteWorksforById(req.params.worksforId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWorksfor,
  getWorksfors,
  getWorksfor,
  updateWorksfor,
  deleteWorksfor,
};

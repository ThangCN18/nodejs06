const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { loaidvService } = require('../services');

const createLoaidv = catchAsync(async (req, res) => {
  const loaidv = await loaidvService.createLoaidv(req.body);
  res.status(httpStatus.CREATED).send(loaidv);
});

const getLoaidvs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await loaidvService.queryLoaidvs(filter, options);
  res.send(result);
});

const getLoaidv = catchAsync(async (req, res) => {
  const loaidv = await loaidvService.getLoaidvById(req.params.loaidvId);
  if (!loaidv) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loaidv not found');
  }
  res.send(loaidv);
});

const updateLoaidv = catchAsync(async (req, res) => {
  const loaidv = await loaidvService.updateLoaidvById(req.params.loaidvId, req.body);
  res.send(loaidv);
});

const deleteLoaidv = catchAsync(async (req, res) => {
  await loaidvService.deleteLoaidvById(req.params.loaidvId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLoaidv,
  getLoaidvs,
  getLoaidv,
  updateLoaidv,
  deleteLoaidv,
};

const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dongxeService } = require('../services');

const createDongxe = catchAsync(async (req, res) => {
  const dongxe = await dongxeService.createDongxe(req.body);
  res.status(httpStatus.CREATED).send(dongxe);
});

const getDongxes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await dongxeService.queryDongxes(filter, options);
  res.send(result);
});

const getDongxe = catchAsync(async (req, res) => {
  const dongxe = await dongxeService.getDongxeById(req.params.dongxeId);
  if (!dongxe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dongxe not found');
  }
  res.send(dongxe);
});

const updateDongxe = catchAsync(async (req, res) => {
  const dongxe = await dongxeService.updateDongxeById(req.params.dongxeId, req.body);
  res.send(dongxe);
});

const deleteDongxe = catchAsync(async (req, res) => {
  await dongxeService.deleteDongxeById(req.params.dongxeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDongxe,
  getDongxes,
  getDongxe,
  updateDongxe,
  deleteDongxe,
};

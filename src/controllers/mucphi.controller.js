const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mucphiService } = require('../services');

const createMucphi = catchAsync(async (req, res) => {
  const mucphi = await mucphiService.createMucphi(req.body);
  res.status(httpStatus.CREATED).send(mucphi);
});

const getMucphis = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await mucphiService.queryMucphis(filter, options);
  res.send(result);
});

const getMucphi = catchAsync(async (req, res) => {
  const mucphi = await mucphiService.getMucphiById(req.params.mucphiId);
  if (!mucphi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mucphi not found');
  }
  res.send(mucphi);
});

const updateMucphi = catchAsync(async (req, res) => {
  const mucphi = await mucphiService.updateMucphiById(req.params.mucphiId, req.body);
  res.send(mucphi);
});

const deleteMucphi = catchAsync(async (req, res) => {
  await mucphiService.deleteMucphiById(req.params.mucphiId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMucphi,
  getMucphis,
  getMucphi,
  updateMucphi,
  deleteMucphi,
};

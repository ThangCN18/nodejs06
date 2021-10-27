const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { nhacungcapService} = require('../services');

const createNhacungcap = catchAsync(async (req, res) => {
  const nhacungcap = await nhacungcapService.createNhacungcap(req.body);
  res.status(httpStatus.CREATED).send(nhacungcap);
});

const getNhacungcaps = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await nhacungcapService.queryNhacungcaps(filter, options);
  res.send(result);
});

const getNhacungcap = catchAsync(async (req, res) => {
  const nhacungcap = await nhacungcapService.getNhacungcapById(req.params.nhacungcapId);
  if (!nhacungcap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhacungcap not found');
  }
  res.send(nhacungcap);
});

const updateNhacungcap = catchAsync(async (req, res) => {
  const nhacungcap = await nhacungcapService.updateNhacungcapById(req.params.nhacungcapId, req.body);
  res.send(nhacungcap);
});

const deleteNhacungcap = catchAsync(async (req, res) => {
  await nhacungcapService.deleteNhacungcapById(req.params.nhacungcapId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNhacungcap,
  getNhacungcaps,
  getNhacungcap,
  updateNhacungcap,
  deleteNhacungcap,
};

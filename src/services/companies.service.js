const httpStatus = require('http-status');
const { Companies } = require('../models');
const ApiError = require('../utils/ApiError');


const createCompanies = async (companiesBody) => {
  if (await Companies.isEmailTaken(companiesBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Companies.create(companiesBody);
};


const queryCompaniess = async (filter, options) => {
  const companiess = await Companies.paginate(filter, options);
  return companiess;
};


const getCompaniesById = async (id) => {
  return Companies.findById(id);
};




const updateCompaniesById = async (companiesId, updateBody) => {
  const companies = await getCompaniesById(companiesId);
  if (!companies) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Companies not found');
  }
  if (updateBody.email && (await Companies.isEmailTaken(updateBody.email, companiesId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(companies, updateBody);
  await companies.save();
  return companies;
};


const deleteCompaniesById = async (companiesId) => {
  const companies = await getCompaniesById(companiesId);
  if (!companies) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Companies not found');
  }
  await companies.remove();
  return companies;
};

module.exports = {
  createCompanies,
  queryCompaniess,
  getCompaniesById,
  updateCompaniesById,
  deleteCompaniesById,
};

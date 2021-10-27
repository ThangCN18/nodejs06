const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const studentRoute = require('./student.route');
const lopRoute = require('./lop.route');
const nhacungcapRoute = require('./nhacungcap.route');
const loaidvRoute = require('./loaidv.route');
const mucphiRoute = require('./mucphi.route');
const dongxeRoute = require('./dongxe.route');


const peopleRoute = require('./people.route');
const professionalRoute = require('./professional.route');
const worksforRoute = require('./worksfor.route');
const companiesRoute = require('./companies.route');


const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/lop',
    route: lopRoute,
  },
  {
    path: '/people',
    route: peopleRoute,
  },
  {
    path: '/professional',
    route: professionalRoute,
  },
  {
    path: '/worksfor',
    route: worksforRoute,
  },
  {
    path: '/companies',
    route: companiesRoute,
  },
  {
    path: '/nhacungcap',
    route: nhacungcapRoute,
  },
  {
    path: '/loaidv',
    route: loaidvRoute,
  },
  {
    path: '/mucphi',
    route: mucphiRoute,
  },
  {
    path: '/dongxe',
    route: dongxeRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

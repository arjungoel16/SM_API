const routes = require('express').Router();
const apiRoutes = require('./api');

routes.use('/api', apiRoutes);

routes.use((req, res) => {
  res.status(404).send('404 Not Found');
});

module.exports = routes;

const homeRouter = require('./homeRouters');
const cartRouter = require("./cartRouters");
const payRouters = require("./payRouters");

function route(app) {
  app.use("/pay", payRouters);
  app.use("/cart", cartRouter);
  app.use('/', homeRouter);
}

module.exports = route;
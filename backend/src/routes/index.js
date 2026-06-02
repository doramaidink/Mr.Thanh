const homeRouter = require('./homeRouters');
const cartRouter = require("./cartRouters");

function route(app) {
  app.use('/', homeRouter);
  app.use("/cart", cartRouter);

}

module.exports = route;
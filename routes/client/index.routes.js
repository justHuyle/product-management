const homeRoutes = require("./home.routes");
const productRoutes = require("./product.routes");

module.exports = (app) => {
  app.use("/", homeRoutes);
  app.use("/products", productRoutes);
};


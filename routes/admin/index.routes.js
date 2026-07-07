const dashboardRoutes = require("./dashboard.routes");
const systemConfig = require("../../config/system");
const productsRoutes = require("./products.routes");
module.exports = (app) => {
    app.use(`${systemConfig.prefixAdmin}/dashboard`, dashboardRoutes);
    app.use(`${systemConfig.prefixAdmin}/products`, productsRoutes);
};


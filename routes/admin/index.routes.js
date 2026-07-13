const dashboardRoutes = require("./dashboard.routes");
const systemConfig = require("../../config/system");
const productsRoutes = require("./products.routes");
const categoriesRoutes = require("./categories.routes");
const roleRoutes = require("./role.routes");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);
    app.use(`${PATH_ADMIN}/products`, productsRoutes);
    app.use(`${PATH_ADMIN}/categories`, categoriesRoutes);
    app.use(`${PATH_ADMIN}/roles`, roleRoutes);
};

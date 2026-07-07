require("dotenv").config();
const express = require("express");

// database
const database = require("./config/database");
// routes
const adminRoutes = require("./routes/admin/index.routes.js");
const clientRoutes = require("./routes/client/index.routes.js");
const systemConfig = require("./config/system");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

const methodOverride = require("method-override");
const app = express();
const port = process.env.PORT;

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// express-flash
app.use(cookieParser("JHGJKLKLGFLJK"));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());
// end express-flash

// method-override
app.use(methodOverride("_method"));

// database connection
database.connect();

// routes
clientRoutes(app);
adminRoutes(app);

// view
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// static files
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

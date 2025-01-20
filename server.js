import "express-async-errors";
import express from "express";
import moment from "jalali-moment";
import cookieParser from "cookie-parser";
import mainRouter from "./src/app-routes.js";
import expressEjsLayouts from "express-ejs-layouts";
import configureSwagger from "./src/config/swagger-config.js";
import configureMongoose from "./src/config/mongoose-config.js";
import notFoundHandler from "./src/common/middlewares/not-found-handler.js";
import globalErrorHandler from "./src/common/middlewares/global-error-handler.js";

const PORT = process.env.PORT;

async function configureServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
  app.use(express.static("public"));
  app.use(expressEjsLayouts);
  app.set("view engine", "ejs");
  app.set("layout", "./layouts/panel/main.ejs");

  app.get("/", (req, res) => {
    res.locals.layout = "./layouts/website/main.ejs";
    res.render("./pages/home/index.ejs");
  });

  app.get("/panel", (req, res) => {
    res.render("./pages/panel/dashboard.ejs");
  });

  app.get("/auth/login", (req, res) => {
    res.locals.layout = "./layouts/auth/main.ejs";
    res.render("./pages/auth/login.ejs");
  });

  app.locals.moment = moment;
  app.use("/api", mainRouter);

  await configureMongoose();
  configureSwagger(app);

  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  app.listen(PORT, () => {});
}

configureServer()
  .then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .catch((error) => console.log(error));

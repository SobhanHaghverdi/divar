import express from "express";
import configureSwagger from "./src/config/swagger-config.js";
import configureMongoose from "./src/config/mongoose-config.js";

const PORT = process.env.PORT;

async function configureServer() {
  const app = express();

  await configureMongoose();
  configureSwagger(app);

  app.listen(PORT, () => {});
}

configureServer()
  .then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .catch((error) => console.log(error));

import express from "express";

async function configureServer() {
  const app = express();

  app.listen(5000, () => {});
}

configureServer()
  .then(() => {
    console.log("Server is running on http://localhost:5000");
  })
  .catch((error) => console.log(error));

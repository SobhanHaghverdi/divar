import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

function configureSwagger(app) {
  const swaggerDocument = swaggerJSDoc({
    swaggerDefinition: {
      openapi: "3.1.0",
      externalDocs: {
        url: "",
        description: "",
      },
      info: {
        version: "1.0.0",
        title: "Divar Back-End",
        description: "Buy and sell platform api endpoints",
        contact: { name: "Sobhan Haghverdi", email: "sobhanhv.dev@gmail.com" },
      },
    },
    apis: [],
  });

  const swagger = swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "Divar Swagger UI",
  });

  app.use("/docs", swaggerUi.serve, swagger);

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDocument);
  });
}

export default configureSwagger;

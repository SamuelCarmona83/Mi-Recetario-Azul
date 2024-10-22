import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Recetas API",
        version: "1.0.0",
        description: "API para la gestión de recetas de cocina",
        contact: {
            name: "Samuel Carmona",
            email: "samuel.carmona.rodrigz@gmail.com",
        },
    },
    tags: [
        {
            name: "Usuarios",
            description: "Operaciones con usuarios",
        },
        {
            name: "Recetas",
            description: "Operaciones con recetas",
        }
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./api/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);

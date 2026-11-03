import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };
import router from './src/router.js';

const app = express();

app.use(express.json());

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use the API routes
app.use(router);

// Home route
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Server is running'
  });
});

export default app;

import 'dotenv/config';
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
import routers from './app/routers/index.js';

import swaggerMiddleware from './app/services/apiDocs.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api-docs', swaggerMiddleware);

app.use(routers);

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;

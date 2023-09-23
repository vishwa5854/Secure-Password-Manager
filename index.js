const express         = require('express');
const app             = require('express')();
const port            = process.env.PORT || '3001';
const dB              = require('./models/dB').initialiseDbConnection;
const userRouter      = require('./routes/user');
const iwrRouter       = require('./routes/iwr');
const authorize       = require('./utils/jwt').validate;
const swaggerUi       = require('swagger-ui-express');
const swagger         = require('./swagger/swagger');
const cors            = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});

app.get("/", (req, res) => {});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger.swaggerSpec, swagger.swaggerOptions));

/** Initialising the database connection */
dB();

app.use('/user', userRouter);

/** Routes above this are not checked for auth token, below this are checked for auth token */
app.use(authorize);

app.use('/iwr', iwrRouter);

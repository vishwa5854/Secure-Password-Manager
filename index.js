const express    = require('express');
const app        = require('express')();
const port       = 3000 || process.env.PORT;
const dB         = require('./models/dB').initialiseDbConnection;
const userRouter = require('./routes/user');
const iwrRouter  = require('./routes/iwr');
const authorize  = require('./utils/jwt').validate;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});

app.get("/", (req, res) => {
    res.send('Hello!');
});

/** Initialising the database connection */
dB();

app.use('/user', userRouter);

/** Routes above this are not checked for auth token, below this are checked for auth token */
app.use(authorize);

app.use('/iwr', iwrRouter);
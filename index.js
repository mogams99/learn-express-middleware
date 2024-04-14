// Import Lib Package
const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan');

// Import Class 
const ErrorHandler = require('./ErrorHandler');

// Config
app.use(morgan('tiny'));
app.use((req, res, next) => {
    // req.timeRequest = Date.now();
    console.log(req.method, req.url);
    next();
});
const middAuth = (req, res, next) => {
    const { password } = req.query;
    if (password === '123456') next();
    throw new ErrorHandler('Password required.', 401);
};

// Routing
app.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});
app.get('/admin', middAuth, (req, res) => {
    res.send('Hello Admin!');
});
app.get('/products', (req, res) => {
    console.log(req.timeRequest);
    res.send({
        message: 'Data successfully retrieved.',
        data: []
    });
});
app.get('/error', (req, res) => {
    bird.fly();
});

// Middleware Error
// app.use((err, req, res, next) => {
//     console.log('**********************************************************');
//     console.log('***************************ERROR**************************');
//     console.log('**********************************************************');
//     next(err);
// });

// Middleware Error Handling
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
});

// Middleware Page Not Found
app.use((req, res) => {
    res.status(404).send('Page not found.');
});

// Connect to App
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
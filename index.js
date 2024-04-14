// Import Lib Package
const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan');

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
    throw new Error('Password required.');
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

// Middleware Page Not Found
app.use((err, req, res, next) => {
    console.log('**********************************************************');
    console.log('***************************ERROR**************************');
    console.log('**********************************************************');
    next(err);
});

// Middleware Page Not Found
app.use((req, res) => {
    res.status(404).send('Page not found.');
});

// Connect to App
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
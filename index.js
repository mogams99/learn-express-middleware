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
app.use((req, res, next) => {
    const { password } = req.query;
    if (password === '123456') next();
    res.send('Password required.');
});

// Routing
app.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});
app.get('/products', (req, res) => {
    console.log(req.timeRequest);
    res.send({
        message: 'Data successfully retrieved.',
        data: []
    });
});
app.use((req, res) => {
    res.status(404).send('Page not found.');
});

// Connect to App
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
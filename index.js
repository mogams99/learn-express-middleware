// Import Lib Package
const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan');

// Config
app.use(morgan('tiny'));
app.use((req, res, next) => {
    console.log('Init middleware 1');
    next();
    console.log('Init middleware 1 after next');
});
app.use((req, res, next) => {
    console.log('Init middleware 2');
    next();
});

// Routing
app.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });

});
app.get('/products', (req, res) => {
    res.send({
        message: 'Data successfully retrieved.',
        data: []
    });
});

// Connect to App
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
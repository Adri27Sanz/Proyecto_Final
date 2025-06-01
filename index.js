const morgan = require('morgan');
const express = require('express');
const app = express();

const empleado = require('./empleado');
const user = require('./user');

const auth = require('./Middleware/auth');
const notFound = require('./Middleware/notFound');
const index = require('./Middleware/index');
const cors = require('./Middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', index);
app.use('/user', user);
app.use(auth);
app.use('/empleado', empleado); 
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is Running...');
});
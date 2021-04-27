const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');


const AppError = require('./utils/appError');
const ProductRouter = require('./routes/productRoute');
const categorytRouter = require('./routes/categoryRoute');
const subCategorytRouter = require('./routes/subCategoryRoute');
const viewRouter = require('./routes/viewRoutes');

// start express app
const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,`public`)));

// Global middleware

// Implement cors
app.use(cors());

app.options('*', cors());

app.use(helmet());

//3rd party middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requset from this IP, please try agin in an hour!'
});

app.use('/api', limiter);

app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());

// Data Sanitization against nosql query injection and data sanitization against cross site scripting attack
app.use(mongoSanitize());

app.use(xss());



app.use(hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}));

app.use(compression());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
})


// Routes
app.use('/', viewRouter);
app.use('/api/v1/products', ProductRouter);
app.use('/api/v1/categories', categorytRouter);
app.use('/api/v1/subCategories', subCategorytRouter);


app.all('*', (req, res, next) => {

    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.statusCode = 404;
    // err.status = 'fail';
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));

});


module.exports = app;

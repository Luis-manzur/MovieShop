const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)

const app = express();

const mongoURI = process.env.MONGO_URI

const store = new MongoDBStore({
    uri: mongoURI,
    collection: 'mySessions',
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

mongoose.connect(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology:true,
});

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const storeRoutes = require('./routes/store');
const cartRoutes = require('./routes/cart');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'my-secret',
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
      },
    saveUninitialized: true,
    store: store
}))




app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/', storeRoutes);
app.use('/cart', cartRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
console.log(`server on port http://localhost:${app.get('port')}`);
});
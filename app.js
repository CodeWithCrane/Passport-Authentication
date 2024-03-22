const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 3000;

//Passport config
const passport = require('passport');
require('./config/passport')(passport);

// Express Session
const flash = require('connect-flash');
const session = require('express-session');
app.use(session({
    secret: 'scret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// connect to mongoDB
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURL;
mongoose.connect(db, {})
    .then(() => console.log('mongoDB conntected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false }));
//用于解析URL编码格式的请求体对象，并将解码后的数据作为req.body对象的属性添加到请求体中


//Routes
app.use('/', require('./routes/index'));
// 当路径为根路径时，使用./route/index路由模块定义的路由
app.use('/users', require('./routes/users'));
// 当前匹配路径为'/', 如果说./routes/users设置了路由为router.get('/login', () => {})
// 将会匹配/users/login路径

app.listen(PORT, console.log(`Server started on port ${PORT}`));
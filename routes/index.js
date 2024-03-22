const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => {
    res.render('welcome');
    //render()有两个参数，第一个参数是视图文件的名称或者路径（当用视图文件的名称作为参数时，
    //会自动在views文件夹下查找文件；第二个参数是数据对象
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        name: req.user.name
    });
});

module.exports = router;


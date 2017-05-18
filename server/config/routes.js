var auth = require('./auth'),
    controllers = require('../controllers'),
    mongoose = require('mongoose');
require('../data/Models/Article');
var Article = mongoose.model('Article');

module.exports = function(app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.createUser);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);
    app.get('/login', controllers.users.getLogin);
    app.get('/', function(req, res) {
        res.render('index', { currentUser: req.user });
    });
    app.get('/projects', function(req, res, next) {
        res.render('projects', {
            title: "Projects"
        });
    });
    app.get('/project/troops', function(req, res, next) {
        res.render('projects/troops/index', {
            title: "Troops"
        });
    });
    app.get('/project/troops/preview', function(req, res, next) {
        res.render('projects/troops/preview', {
            title: "Troops"
        });
    });
    app.get('/project/web-presentation', function(req, res, next) {
        res.render('projects/web-presentation/index', {
            title: "Web Presentation"
        });
    });
    app.get('/snippets', function(req, res, next) {
        res.render('snippets');
    });
    app.get('/snippet/webworker', function(req, res, next) {
        res.render('snippets/webworker');
    });
    app.get('/articles', function(req, res, next) {
        Article.find(function(err, articles) {
            if (err) return next(err);
            res.render('articles/list', {
                title: 'The Night Captain',
                articles: articles
            });
        });
    });
    app.get('/article', function(req, res, next) {
        res.render('article/view');
    });
    app.get('/admin', function(req, res, next) {
        res.render('admin/index', { currentUser: req.user });
    });
};

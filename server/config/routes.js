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
            console.log(articles);
            if (err) return next(err);
            res.render('articles/list', {
                title: 'The Night Captain',
                articles: articles
            });
        });
    });
    app.post('/articles', function(req, res, next) {
        var payload = req.body;
        console.log(payload);
        Article.create(payload, function(err) {
            console.log('created');
            if (err) return next(err);
            res.json({
                message: req.body
            });
        });
    });
    app.post('/article/:id', function(req, res, next) {
        var payload = req.body;
        console.log(payload);
        Article.findById(req.params.id,function(err, blog){
            blog.title = payload.title;
            blog.body = payload.body;
            blog.shortdesc = payload.shortdesc;
            blog.save(function(err, updatedArticle){
                res.render('articles/edit',{article: updatedArticle});
            })
        });
    });
    app.get('/article/:slug', function(req, res, next) {
        Article.find({
            slug: req.params.slug
        },function(err, data){
            console.log(data);
            res.render('article/view',{article: data});
        });
    });
    app.get('/edit/:id', function(req, res, next) {
        Article.find({
            _id: req.params.id
        },function(err, data){
            console.log(data);
            res.render('articles/edit',{article: data[0]});
        });
    });
    app.get('/admin', function(req, res, next) {
        Article.find(function(err, articles) {
            console.log(articles);
            if (err) return next(err);
            res.render('admin/index', {
                articles: articles,
                currentUser: req.user
            });
        });
    });
};

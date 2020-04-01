const express = require('express');
const router = express.Router();
const moment = require('moment');
const Article = require('../models/article');

router.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc'});
  res.render('articles/index', { articles: articles });
})

router.get('/new', (req, res) => {
  res.render('articles/new');
})

router.post('/add', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });
  try {
    await article.save();
    res.redirect(`/article/${article.id}`);
  }
  catch (e) {
    console.log(e);
  }
})

router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    res.redirect('/');
  }
  res.render('articles/show', {
    article: article,
    cretedAt: moment(article.createdAt).format('DD-MM-YYYY')
  });
})


module.exports = router;
const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const hasPermission = require('../middleware/hasPermission');
const { createArticle, getArticles, getArticle, updateArticle, deleteArticle} = require('../controllers/article');

// CREATE ARTICLE (writer, editor, admin)
router.post('/',  isAuth,  hasPermission('article:create'), createArticle);

// GET ALL ARTICLES
router.get('/', isAuth, getArticles);

// GET ONE ARTICLE
router.get('/:id', isAuth, getArticle);

// UPDATE ARTICLE
router.put('/:id', isAuth, hasPermission('article:update:any', 'article:update:own'), updateArticle );

// DELETE ARTICLE
router.delete('/:id', isAuth, hasPermission('article:delete:any'), deleteArticle);

module.exports = router;

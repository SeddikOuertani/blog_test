const express = require('express');
const router = express.Router();


const isAuth = require('../middleware/isAuth');
const hasPermission = require('../middleware/hasPermission');
const { createComment, getCommentsByArticle, replyToComment, deleteComment } = require('../controllers/comment');

// CREATE COMMENT
router.post( '/', isAuth, hasPermission('comment:create'), createComment);

// GET COMMENTS OF AN ARTICLE (threaded)
router.get('/article/:articleId', isAuth, getCommentsByArticle) 

// REPLY TO A COMMENT
router.post('/reply', isAuth, hasPermission('comment:reply'), replyToComment);

// DELETE COMMENT
router.delete('/:id', isAuth, hasPermission('comment:delete:any', 'comment:delete:own'), deleteComment);

module.exports = router;

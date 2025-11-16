const Article = require('../models/Article');

async function isOwner(req, res, next) {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });

  if (article.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not allowed: not the owner' });
  }

  next();
}
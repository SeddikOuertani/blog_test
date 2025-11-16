const Comment = require('../models/Comment');
const Article = require('../models/Article');

module.exports.createComment = async (req, res) => {
  try {
    const { articleId, content, parentId } = req.body;

    const article = await Article.findById(articleId);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const comment = await Comment.create({
      content,
      article: articleId,
      author: req.user._id,
      parent: parentId || null,
    });

    return res.json(comment);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.getCommentsByArticle = async (req, res) => {
  const comments = await Comment.find({
    article: req.params.articleId,
  })
    .populate("author", "username")
    .lean();

  return res.json(comments);
};

module.exports.replyToComment = async (req, res) => {
  try {
    const { parentId, content } = req.body;

    const parent = await Comment.findById(parentId);
    if (!parent)
      return res.status(404).json({ message: "Parent comment not found" });

    const reply = await Comment.create({
      content,
      article: parent.article,
      author: req.user._id,
      parent: parentId,
    });

    return res.json(reply);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  const isAdminOrEditor =
    req.user.role.permissions.includes("comment:delete:any");

  // writer can only delete own
  if (
    !isAdminOrEditor &&
    comment.author.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Permission denied" });
  }

  await comment.deleteOne();

  return res.json({ message: "Comment deleted" });
};

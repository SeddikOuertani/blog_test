const Article = require("../models/Article");

module.exports.createArticle = async (req, res) => {
  try {
    console.log({body: req.body})
    const article = await Article.create({
      ...req.body,
      author: req.user._id,
    });

    return res.json(article);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.getArticles = async (req, res) => {
  const articles = await Article.find().populate("author", "username");
  return res.json(articles);
};

module.exports.getArticle = async (req, res) => {
  const article = await Article.findById(req.params.id).populate(
    "author",
    "username"
  );
  if (!article) return res.status(404).json({ message: "Not found" });

  return res.json(article);
};

module.exports.updateArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: "Not found" });

  // Writer can only update own articles
  if (
    !req.user.role.permissions.includes("article:update:any") &&
    article.author.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Permission denied" });
  }

  const updated = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.json(updated);
};

module.exports.deleteArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: "Not found" });

  await article.deleteOne();

  return res.json({ message: "Article deleted" });
};

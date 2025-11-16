const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true },
    content: { type: String, required: true },
    image:   { type: String },

    tags:    { type: [String], index: true },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

// For performance on list view
articleSchema.index({ title: 'text', content: 'text' });
articleSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model('Article', articleSchema);

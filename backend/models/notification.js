const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    type: {
      type: String,
      enum: ['new-comment', 'reply', 'article-update'],
      required: true
    },

    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article'
    },

    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    },

    seen: { type: Boolean, default: false }
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, seen: 1 });

module.exports = mongoose.model('Notification', notificationSchema);

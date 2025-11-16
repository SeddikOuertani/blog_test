const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['admin', 'editor', 'writer', 'reader'],
      required: true,
      unique: true
    },
    permissions: {
      type: [String], // ex: ['article:create', 'article:update:any', 'comment:create']
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);

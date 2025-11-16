require('dotenv').config();
const mongoose = require('mongoose');
const Role = require('./models/role');

async function seedRoles() {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB || undefined
  });

  const roles = [
    {
      name: 'admin',
      permissions: [
        'admin:*',

        'article:create',
        'article:update:any',
        'article:delete:any',

        'comment:create',
        'comment:reply',
        'comment:delete:any'
      ]
    },
    {
      name: 'editor',
      permissions: [
        'article:create',
        'article:update:any',

        'comment:create',
        'comment:reply'
      ]
    },
    {
      name: 'writer',
      permissions: [
        'article:create',
        'article:update:own',

        'comment:create',
        'comment:reply'
      ]
    },
    {
      name: 'reader',
      permissions: []
    }
  ];

  await Role.deleteMany({});
  await Role.insertMany(roles);

  console.log('Roles seeded successfully.');
  process.exit();
}

seedRoles().catch(err => console.error(err));
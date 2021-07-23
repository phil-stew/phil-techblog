const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const seedUserData = require('./userData.json');
const seedBlogData = require('./blogData.json');
const seedCommentData = require('./commentData.json')


const seedAll= async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(seedUserData, {
  individualHooks: true,
  returning: true,
});

  await Blog.bulkCreate(seedBlogData, {
      individualHooks: true,
      returning: true,
  });

  await Comment.bulkCreate(seedCommentData, {
      individualHooks: true,
      returning: true,
  });
  
  process.exit(0);
};




// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const blog of blogData) {
//     await Blog.create({
//       ...blog,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   process.exit(0);
// };

seedAll();

const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


User.hasMany(Blog, {
  foreignKey: 'user_id',

});

User.hasMany(Comment, {
  foreignKey: 'blog_id'

});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
 
});

Comment.belongsTo(User,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});




module.exports = { User, Blog, Comment };

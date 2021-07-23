const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          ket: 'id'
        }
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'blog',
          key: 'id'
        }
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    },

     
      
      
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
    }
  );
  
  module.exports = Comment;
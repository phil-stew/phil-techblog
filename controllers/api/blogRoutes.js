const router = require("express").Router();
 const Sequelize = require('sequelize');
const { User, Blog, Comment } = require("../../models");


router.get('/', async (req, res) => {
  

    try {
        // Gets all Posts and serializes
        const dbBlogData = await Blog.findAll();
        const blogData = dbBlogData.map((blog) => blog.get({ plain: true }))

        // Extracts the username associated to the post
        for (let i = 0; i < blogData.length ; i++) {
            const userData = await User.findOne({where: {
                id: blogData[i].userId
            }})
            blogData[i].name = userData.username
        }

        console.log(blogData)

        // console.log(PostPlain)
        res.render('blogpost', {
        blogArr: blogData,
        });

    } catch {
        console.log(error)
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
  
    try {
        const blogData = await Blog.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        if (!blogData) {
          res.status(404).json({ message: 'No category found with that id!' });
          return;
        }
    
        res.status(200).json(blogData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/', async (req, res) => { 
   
      const commentData = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id   
      });
    
  });

module.exports = router;

const router = require("express").Router();
const { User,  Comment } = require("../../models");

// Gets all available comments ✔️
router.get('/', async (req, res) => {
    // if (!req.session.user_id) {
    //     res.redirect("/")
    // }
    try {
        const commentData = await Comment.findAll();
        const comments = commentData.map((blog) => blog.get({ plain: true }))
        
        res.status(200).json(comments);
    } catch {
        console.log(error)
        res.status(500).json(err);
    }
});

// Gets the comments of a specific blog's id ✔️
router.get('/blog/:id', async (req, res) => {
    if (!req.session.user_id) {
        res.redirect("/")
    }
    try {
        const commentData = await Comment.findAll({
            where: {
                postId: req.params.id
            }
        });
        const comments = commentData.map((blog) => blog.get({ plain: true }))
        
        for (let i = 0; i < comments.length ; i++) {
            const userData = await User.findOne({where: {
                id: comments[i].user_id
            }})
            comments[i].username = userData.username
        }

        console.log(comments)

        res.status(200).json(comments);
    } catch {
        console.log(error)
        res.status(500).json(err);
    }
});

// POST method ✔️
router.post('/', async (req, res) => { 
    if (!req.session.user_id) {
        alert("Only registered users can comment on blogs. Redirecting to signup page")
        res.redirect("/login")
    }
    try { 

    // A POST-compatible comment data structure 
      const commentData = await Comment.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.session.user_id // does not work!
      });

      console.log(req.session.user_id)
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports = router;
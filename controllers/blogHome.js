const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
   
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost', async (req, res) => {
  try {
   
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs)
    // Pass serialized data and session flag into template
    res.render('blogpost', { 
      
      blogs, 
      
      logged_in: req.session.logged_in 
      
    });

  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/blog/:id', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {

    const blogData = await Blog.findByPk(req.params.id,)

    const blog = blogData.get({ plain: true });

    res.render('viewblog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get('/viewblog', async (req, res) => {
//   try {
   
//     const commentData = await Comment.findAll({
//       include: [
//         {
//           model: Blog,
//           attributes: ['title'],
      
//         },
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const comments = commentData.map((comment) => comment.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('viewblog', { 
//     comments, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
// router.get('/comment', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Blog }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('comment', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/blogpost', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: User, Comment, Blog }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('blogpost', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/viewblog', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const blogData = await Blog.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: User,
          attributes: ['name'], 
        },{ model: comment,
        attributes:['text', 'blog_id', 'user_id']}
      
      ],
      });
  
      const blog = blogData.get({ plain: true });
  
      res.render('viewblog', {
        ...blog,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }


  });


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/blogpost');
    return;
  }

  res.render('login');
});

module.exports = router;

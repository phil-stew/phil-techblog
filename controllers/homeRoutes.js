const router = require("express").Router();

const { User,  Blog, Comment } = require("../models");

router.get("/", async (req, res) => {
    const blogs = blogData = await Blog.findAll({
      include: [User]
    });
    const blogDatas = blogs.map((blog) => blog.get({ plain: true }))
    blogDatas.reverse()
    if (req.session.user_id) {
    res.render("blogpost", {
      blogArr: blogDatas,  
      logged_in: req.session.user_id 
    })
    } else {
      res.render("blogpost", {
        blogArr: blogDatas,   
      })
    }
  });

router.get("/blog", async (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect("/login")
  // } 
  const blogs = blogData = await Blog.findAll({
    where: {
      user_id: req.session.user_id // || 1
    },
    include: [User]
  });
  const blogDatas = blogs.map((blog) => blog.get({ plain: true }))
  blogData.reverse()

  console.log(blogDatas)

  res.render("blog", {
    blogArr: blogDatas,
    logged_in: req.session.user_id,
    username: req.session.username       
  })
})

module.exports = router;

router.get("/login", async (req, res) => {
  res.render("login", {
  })
});

router.get("/newblog", async (req, res) => {
  res.render("newblog", {
    logged_in: req.session.user_id
  })
});

router.get("/comment/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [User]
    });
    const commentBlogData = blogData.get({ plain: true });

    res.render('comment', {
      layout: 'main',
      ...commentBlogData,
      logged_in: req.session.user_id
    });
  } catch (err) {
    console.log(err)
  }
});

router.get("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  }
  res.redirect("/login")
  res.render("login", {
  })
});
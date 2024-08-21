import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }) );
app.use(express.json());

class Post {
  postId;
  title;
  author;
  content;

  constructor(title, author, content) {
    this.title = title;
    this.author = author;
    this.content = content;
    this.postId = Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, 0);
  }
}

const blogPosts = [];

const blogIndex = [];

class postCatalogue {
  title;
  url;

  constructor(title, postId) {
    this.title = title;
    this.url = postId;
  }
}

app.get("/", (req, res) => {
    res.render("main.ejs", {blogIndex});
  });

app.get("/write", (req, res) => {
    res.render("write.ejs");
  });

  app.post("/write", (req, res) => {
    let newPost = new Post(req.body.title, req.body.author, req.body.content);
    blogPosts.push(newPost);
    let newPostCatalogue = new postCatalogue(newPost.title, newPost.postId);
    blogIndex.push(newPostCatalogue);
    res.render("main.ejs", {blogIndex});
  });

  app.get("/:id", (req, res) => {
    let params = req.params;
    console.log(params);
    let blogPost = blogPosts.find((post) => post.postId == params.id);
    if (blogPost == undefined) {
      res.render("main.ejs", {blogIndex});
    } else {
      res.render("post.ejs", {blogPost});
    }
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

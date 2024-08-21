import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }) );
app.use(express.json());

app.get("/", (req, res) => {
    res.render("main.ejs");
  });

app.get("/write", (req, res) => {
    res.render("write.ejs");
  });

  app.post("/write", (req, res) => {
    res.render("main.ejs");
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

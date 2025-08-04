let posts = [];

export const getPosts = (req, res) => {
  res.json(posts);
};

export const createPost = (req, res) => {
  const { title, name, text } = req.body;

  posts.push({
    id: posts.length + 1,
    title,
    name,
    text,
    createdAt: new Date(),
  });

  res.json({ title, name, text });
};

export const deletePost = (req, res) => {
  const id = req.params.id;
  console.log("아이디", id);

  console.log(posts);

  const filteredPosts = posts.filter((post) => post.id !== +id);

  console.log(filteredPosts);

  const isLengthChanged = posts.length !== filteredPosts.length;

  posts = filteredPosts;

  if (isLengthChanged) {
    res.json("OK");
    return;
  }

  res.json("NOT CHANGED");
};

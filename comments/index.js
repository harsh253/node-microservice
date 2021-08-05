const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

const EVENT_BUS_SERVICE_URL = "http://localhost:4005";

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const postId = req.params.id;
  const { content } = req.body;

  function Comment({id,content}){
    this.id = id;
    this.content = content;
  }

  const comment = new Comment({
    id: commentId,
    content
  })

  const comments = commentsByPostId[postId] || [];

  comments.push(comment);

  commentsByPostId[postId] = comments;

  await axios.post(`${EVENT_BUS_SERVICE_URL}/events`, {
    type: "CommentCreated",
    data : {
      id: commentId,
      content,
      postId
    }
  })

  res.status(201).send(comments);
});

app.post("/events", (req,res)=>{
  console.trace("Event received in comments : ", req.body.type);
  res.send({})
})

app.listen(4001, () => {
  console.log('Listening on 4001');
});

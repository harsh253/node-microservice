const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const EVENT_BUS_SERVICE_URL = "http://localhost:4005";

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  function Post({id, title}){
    this.id = id;
    this.title = title;
  }

  let post = new Post({id,title});
  posts[id] = post;
  
  await axios.post(`${EVENT_BUS_SERVICE_URL}/events`, {
    type : 'PostCreated',
    data : post
  })

  res.status(201).send(posts[id]);
});


app.post("/events", (req,res)=>{
  console.log("Event received in post : ", req.body.type);
  res.send({})
})

app.listen(4000, () => {
  console.log('Listening on 4000');
});

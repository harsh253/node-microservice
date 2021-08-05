const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
})

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    let id = null;
    switch (type) {
        case "PostCreated":
            ({id} = data);
            const { title } = data;
            posts[id] = {
                id,
                title,
                comments: []
            }
            break;

        case "CommentCreated":
            ({id} = data);
            const { content, postId } = data;
            posts[postId].comments.push({
                id,
                content
            })
            break;

        default:
            break;

    }

    console.log(posts)
    res.send({});
})

app.listen(4002, () => {
    console.log("Listening on 4002");
})
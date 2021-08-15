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
    
    switch (type) {
        case "PostCreated":
            var { id, title } = data;
            posts[id] = {
                id,
                title,
                comments: []
            }
            break;

        case "CommentCreated":
            var { id, content, postId, status} = data;
            posts[postId].comments.push({
                id,
                content,
                status
            })
            break;

        case "CommentUpdated":
            var {id, content, postId, status} = data;
            let updatedComments = posts[postId].comments.map((comment) => {
                if(comment.id === id){
                    return {
                        ...comment,
                        status,
                        content
                    }
                }
                return comment;
            })
            posts[postId].comments = updatedComments;
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
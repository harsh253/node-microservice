const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const POST_SERVICE_URL = "http://localhost:4000";
const COMMENTS_SERVICE_URL = "http://localhost:4001";
const QUERY_SERVICE_URL = "http://localhost:4002";
const MODERATION_SERVICE_URL = "http://localhost:4003";

const allServiceUrl = [POST_SERVICE_URL,COMMENTS_SERVICE_URL,QUERY_SERVICE_URL,MODERATION_SERVICE_URL];

app.post("/events", (req,res)=>{
    const event = req.body;

    allServiceUrl.map((url)=>{
        axios.post(`${url}/events`, event).catch((err) => {
            console.log(err.message);
        });
    })

    res.send({status : 'OK'})
});

app.listen(4005, ()=>{
    console.log("Listening on 4005");
})

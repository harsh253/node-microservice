const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const POST_SERVICE_URL = "http://localhost:4000";
const COMMENTS_SERVICE_URL = "http://localhost:4001";
const QUERY_SERVICE_URL = "http://localhost:4002";

app.post("/events", (req,res)=>{
    const event = req.body;

    axios.post(`${POST_SERVICE_URL}/events`, event);
    axios.post(`${COMMENTS_SERVICE_URL}/events`, event);
    axios.post(`${QUERY_SERVICE_URL}/events`, event);

    res.send({status : 'OK'})
});

app.listen(4005, ()=>{
    console.trace("Listening on 4005");
})

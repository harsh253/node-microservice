const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const EVENT_BUS_SERVICE_URL = "http://localhost:4005";

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if(type === "CommentCreated"){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        console.log(status, " " , data);
        await axios.post(`${EVENT_BUS_SERVICE_URL}/events`, {
            type : "CommentModerated",
            data : {
                ...data,
                status
            } 
        })
    }

})

app.listen(4003, () => {
    console.log('Running on port 4003');
})
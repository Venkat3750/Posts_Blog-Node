const express = require('express');
const bodyparser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
const posts = {};
app.use(bodyparser.json());
app.use(cors());

app.get('/posts',(req,res)=>{
res.send(posts);
});
app.post('/posts', async (req,res)=>{
const id = randomBytes(4).toString('hex');
const {title} = req.body;
posts[id] = {
    id, title
};

await axios.post('http://localhost:4005/events',{

    type: 'PostCreated',
    data : {
        id,title 
    }
});

res.status(201).send(posts[id]);    
});

app.post('/events',(req,res)=> {

    console.log('Received Event',req.body.type);

});

app.listen('4000',()=>{
console.log("App is listening to port 4000");
});
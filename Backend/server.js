const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
mongoose.connect('mongodb://localhost:27017')
.then(()=>{
    app.listen(8088,()=>{
        console.log('server is running on port 8088');
    })
})
.catch((err)=>{
    console.log(err);
});

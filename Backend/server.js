const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Routesuser = require('./routers/userRoutes')
const Routeservice = require('./routers/serviceRoutes')
const Routejob = require('./routers/jobRequestRoutes')
const RouteFeed = require('./routers/feedBackRoutes')

const PORT = 8088;
const dbURL = "mongodb://localhost:27017/";
const app = express();
app.use(express.json())
app.use(cors());
app.use('/userRoutes',Routesuser)
app.use('/serviceRoutes',Routeservice)
app.use('/jobRequestRoutes',Routejob)
app.use('/feedBackRoutes',RouteFeed)

mongoose.connect(dbURL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log('server is connected successfully and running',`${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
});

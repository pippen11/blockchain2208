const express = require('express');
const cors = require('cors')
const app = express();
const router = require('./routes/index.js')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(router);

app.listen(4000, ()=>{
    console.log('back server onload')
})
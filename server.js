require('dotenv/config')
const express = require('express')
app = express()
const cors = require('cors')
const multer = require('multer');

const posts = require('./app/posts')

app.use(cors())
const formData = multer();
app.use(formData.array());

app.use('/posts', posts)

app.get('/', (req, res) => {
    res.json({
        name: "REST API Server",
        version: "1.0.0"
    })
})

app.listen(3000)


const express = require("express")
const app = express()
const cors = require('cors')
const user = require('./controllers/user')
const post = require('./controllers/post')
const comment = require('./controllers/comment')
const PORT=8080;

app.use(cors())
app.use(express.json())

// CRUD operations for users table

app.post("/user", user.create)
app.get("/user", user.get)
app.get("/user/:id", user.getOneUser)
app.put("/user/:id", user.put)
app.delete("/user/:id", user.delete)

// CRUD operations for posts table

app.post("/post", post.create)
app.get("/post", post.get)
app.get("/post/:id", post.getForSingleUser)
app.put("/post/:id", post.put)
app.delete("/post/:id", post.delete)

// CRUD operations for comments table

app.post("/comment", comment.create)
app.get("/comment", comment.get)
app.get("/comment/:id", comment.getCommentForPost)
app.put("/comment/:id", comment.put)
app.delete("/comment/:id", comment.delete)

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"build")))
    app.get('/*',(req,res)=>{
        res.sendFile(path.join(__dirname+'/build/index.html'));
    })
} 


module.exports = app
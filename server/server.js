const express = require('express')
const app = express()

function getStuff(){
    return "hello, stuff!";
}

app.get("/api", (req, res) =>{
    res.json(getStuff())
    //res.json({"users": ["user1", "user2", "user3"]})
})

app.listen(5000, () => {console.log("Server started on port 5000") })
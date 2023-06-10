const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());
app.use(express.json())


const myFunct = async (inputD) => {
    return `Received ${inputD}`
}

app.post("/api", async (req, res) => {
    res.json(req.body.inputD)
    
    //res.json({"users": ["user1", "user2", "user3"]})
})

app.listen(5000, () => {console.log("Server started on port 5000") })
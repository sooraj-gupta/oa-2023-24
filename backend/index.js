import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: "https://oa-7dgb.onrender.com"
}))

app.get("/", (req, res) => {
    res.send({
        x: [1, 2, 3],
        y: [4, 5, 6],
        type: "scatter"
    }).status(200)
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))
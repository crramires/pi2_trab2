const express = require("express")
const app = express()
const port = 3306

const routes = require("./routes")

app.use(express.json());

app.use(routes);


app.get("/", (req, res) => {
    res.send("Hello World!")
})




app.listen(port, () => {
    console.log(`O app está rodando em http://localhost:${port}`)
})
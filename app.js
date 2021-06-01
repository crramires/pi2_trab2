const express = require('express')
const app = express()
const port = process.env.Port || 3000

const routes = require('./routes')


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json());

app.use(routes);


app.listen(port, () => {
    console.log(`O app está rodando em http://localhost:${port}`)
})
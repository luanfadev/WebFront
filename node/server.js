const http  =require('http')
const PORT = 8001

const server = http.createServer((req, res) => {
    res.end("Hello world!!")
})

server.listen(PORT, () => {
    console.log(`server run on http://localhost:${PORT}`)
})
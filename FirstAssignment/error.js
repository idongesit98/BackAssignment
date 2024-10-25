const http = require('http')
const errorHandler = require("./public/errorHandler")
const PORT = 4040;
const HOST_NAME = "localhost";


const server = http.createServer((req,res) => {
    errorHandler(req,res);
})

server.listen(PORT,HOST_NAME, () => {
    console.log(`Server is listening on ${HOST_NAME} :${PORT}`)
});
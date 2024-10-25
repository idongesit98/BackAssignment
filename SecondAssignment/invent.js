const http = require("http");
const inventoryRoutes = require("./Routes/inventoryRoutes");

const PORT = 4000;
const HOST_NAME = "localhost";


const server = http.createServer((req,res) =>{
    inventoryRoutes(req,res);
});

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server is listening on ${HOST_NAME} :${PORT}`)
})

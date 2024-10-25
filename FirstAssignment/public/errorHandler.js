const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname,"/index.html");
const pathToErrFile = path.join(__dirname,"/404.html")

function errorHandler (req,res) {
    if (req.url == "/index.html" && req.method == "GET") {
        fs.readFile(pathToFile, "utf-8",(err,data) => {
            if (err) {
                console.log("File not found");
                res.writeHead(500)
                res.end("Error loading 404 page")
            }else{
                console.log("Home Page")
                res.writeHead(200,{
                    contentType: "text/html"
                });
                res.write(data);
                res.end();
            }
        });
    }else{
        fs.readFile(pathToErrFile, "utf-8", (err,data) =>{
            if (err) {
                console.log("File not found")
                res.end();
            }else{
                console.log("Error Page")
                res.writeHead(404,{
                    contentType:"text/html"
                });
                res.write(data)
                res.end();
            }
        })
    }
}


module.exports = errorHandler
const { getAllItems, createItem, updateItem, deleteItems, getOneItem } = require("../controllers/InventoryController");

const inventoryRoutes = function (req,res){
    res.setHeader("Content-type", "application/json");

    // if (req.url === "/all-items" && req.method === "GET") {
    //     getAllItems(req,res) 
    // }else if (req.url === "/create-item" && req.method === "POST") {
    //    createItem(req,res)
    // }

    switch (true) {
        case req.url === "/all-items" && req.method === "GET":
            getAllItems(req,res)
            break;

        case req.url.match(/\/item\/\w+/) && req.method === "GET":
            const itemId = req.url.split('/')[2];
            getOneItem(req,res,itemId)
            break;    

        case req.url === "/create-item" && req.method === "POST":
            createItem(req,res)   
            break;
        
        case req.url.match(/\/update-item\/\w+/) && req.method === "PUT":
            const updateId = req.url.split('/')[2];
            updateItem(req,res,updateId)
            break;
        
        case req.url.match(/\/delete-item\/\w+/) && req.method === "DELETE":
            const deleteId = req.url.split('/')[2];
            deleteItems(req,res,deleteId)
            break;

        default:
            res.writeHead(404)
            res.end(JSON.stringify({message: "Route not found"}))
            break;
    }

}

module.exports = inventoryRoutes
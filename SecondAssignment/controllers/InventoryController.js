const {readFile, writeFile} = require("../utils/inventoryUtils");

function getId(items) {
    const ids = items.map((item) => parseInt(item.id))
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    
}
function getAllItems(req,res) {
   const items = readFile();
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify({success:true, data:items}));
}

function getOneItem (req,res,id) {
    const items = readFile();
    const item = items.find(i => i.id === parseInt(id));

    if (!items) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({success:false, data: "Item not found in the inventory"}));
    }else{
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({success:true, data:item}));
    }
}

function createItem (req,res) {
    let body = '';

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () =>{

        const {product_name, price,size} = JSON.parse(body);

        //Read the existing inventory
        const items = readFile();
        const newItems = {
            id: getId(items),
            product_name,
            price,
            size,
            date_created: new Date().toISOString()
        }
        items.push(newItems); //Push the new item to the item
        writeFile(items); //Save the file into the inventory.json

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({success:true, data:newItems}))
        console.log(`Inventory Item created successfully: ${newItems.id}`)
    });
};

function updateItem(req,res,id) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const {product_name, price, size} = JSON.parse(body);
        const items = readFile();
        const index = items.findIndex(i => i.id === parseInt(id));

        if (index === -1) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({success:false, message: "Item with the specified Id is not found"}))
        }else {
            items[index] = {id,product_name,price,size,updateAt: new Date().toISOString()};
            writeFile(items);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({success:true, data:items[index]}))
            console.log(`Item with ${id} updated successfully`)
        }
    })
}

function deleteItems(req,res,id) {
    const items = readFile();
    const updatedItems = items.filter(i => i.id !== parseInt(id));

    if (items.lenght === updatedItems.length) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({success:false, message: "Item with id not found"}));
    }else {
        writeFile(updatedItems);
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify({success:true, message:"Item deleted successfully"}));
        console.log(`Item with id: ${updatedItems.id} deleted succesfully`)
    }
}

module.exports = {getAllItems, getOneItem,createItem,updateItem,deleteItems}


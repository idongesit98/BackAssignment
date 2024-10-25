const fs = require("fs")
const path = require("path")
const inventoryPath = path.join(__dirname, '../db/inventory.json'); //"db", "inventory.json" it brought error anytime i put inventoryUtils into a folder
console.log("Inventory Path:",inventoryPath)


function readFile() {
   const data = fs.readFileSync(inventoryPath, 'utf-8');
   return JSON.parse(data || '[]');
}

function writeFile (data) {
    fs.writeFileSync(inventoryPath,JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = {inventoryPath,readFile, writeFile}
const fs = require("fs");
const item_path_list = fs.readFileSync("./Item/temp_item_list.txt").toString().split("\n");

const temp = {
    path: item_path_list
}

fs.writeFile("./Item/item_path_list.json", JSON.stringify(temp), "utf8", () => {});
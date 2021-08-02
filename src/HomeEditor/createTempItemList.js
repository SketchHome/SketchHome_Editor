const createTempItemList = () => {
    const fs = require("fs");

    const data_path = "../../../public/3d_data";
    
    fs.readdir(data_path, (err, files) => {
        //handling error
        if (err) {
            return console.log("Unable to scan directory: " + err);
        }
        const _dir = files.filter(file => (file.includes("design") && file.split(".").length === 1));
    
        _dir.forEach(design => {
            getItemPath(design);
        });
    });
    
    const getItemPath = (_dir) => {
        const rel_path = "./3d_data";
        fs.readdir(`${data_path}/${_dir}`, (err, files) => {
            if (err) {
                return console.log("Unable to scan directory: " + err);
            }
    
            const design_list = files.filter(file => (file.includes("design") && file.split(".").length === 1));
            if (design_list.length === 0) {
                writeItemPath2TXTFile(`${rel_path}/${_dir}`)
            }
            else {
                design_list.forEach(design => {
                    writeItemPath2TXTFile(`${rel_path}/${_dir}/${design}`)
                })
            }
        })
    }
    
    const writeItemPath2TXTFile = (path) => {
        fs.appendFile("./Item/temp_item_list.txt", path + "\n", function (err) {
            if (err) return console.log(err);
            console.log(`${path} > temp_item_list.txt`);
        });
    }
}

createTempItemList();
const {
    readFile,
    writeFile,
    findInDir,
} = require('./Shared/methods')

const dSearch = (startDir, keys, args) =>{
    if(args.keys){
        keys = keys.split(',')
    }else{
        keys = readFile(key, args.input_delimiter)
    }
    
}

module.exports = {
    dSearch
}
const fs = require('fs')

const readFile = (path, input_delimiter) => {
    let raw = fs.readFileSync(path, {encoding:'utf-8'});

    let rawLines = raw.split(input_delimiter)

    re = RegExp(input_delimiter)
    let lines = []
    for(var i = 0; i< rawLines.length; i++){
        lines.push(rawLines[i].replace(re, ''))

    }

    return lines
}

module.exports = {
    readFile
}
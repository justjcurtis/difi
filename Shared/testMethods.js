const fs = require('fs')

const readFile = (path, input_delimiter) => {
    let raw = fs.readFileSync(path, {encoding:'utf-8'});

    let rawLines = raw.split(input_delimiter)

    re = RegExp(input_delimiter)
    let lines = []
    for(var i = 0; i< rawLines.length; i++){
        let line = rawLines[i].replace(re, '')
        lines.push(line)
    }

    return lines
}
const removeDuplicates = lines =>{
    let re = RegExp('^\s*$')
    return lines.filter((value, index, self) =>{
        if(value.match(re)){return true}
        return self.indexOf(value) === index;
    })
}

const removeBlanks = lines =>{
    let re = RegExp('^\s*$')
    return lines.filter((value, index, self) =>{
        return !value.match(re)
    })
}

const lowerCase = lines =>{
    return lines.map(line =>{
        return line.toLowerCase()
    })
}

const removeKeyword = (lines, keyword, ignoreCase)=>{
    return lines.filter(line =>{
        if(ignoreCase){
            return !line.toLowerCase().includes(keyword.toLowerCase())
        }else{
            return !line.includes(keyword)
        }
    })
}
const removeBeforeKeyword = (lines, keyword, ignoreCase)=>{
    return lines.filter((value, index, self) =>{
        if(index == self.length -1){return true}
        if(ignoreCase){
            return !self[index + 1].toLowerCase().includes(keyword.toLowerCase())
        }else{
            return !self[index + 1].includes(keyword)
        }
    })
}
const removeAfterKeyword = (lines, keyword, ignoreCase)=>{
    return lines.filter((value, index, self) =>{
        if(index == 0){return true}
        if(ignoreCase){
            return !self[index - 1].toLowerCase().includes(keyword.toLowerCase())
        }else{
            return !self[index - 1].includes(keyword)
        }
    })
}

module.exports = {
    readFile,
    removeDuplicates,
    removeBlanks,
    lowerCase,
    removeKeyword,
    removeBeforeKeyword,
    removeAfterKeyword
}
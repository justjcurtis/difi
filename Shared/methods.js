const fs = require('fs')
const path = require('path');

const readFile = (path, input_delimiter) => {
    let raw = fs.readFileSync(path, {
        encoding: 'utf-8'
    });

    let rawLines = raw.split(input_delimiter)

    re = RegExp(input_delimiter)
    let lines = []
    for (var i = 0; i < rawLines.length; i++) {
        lines.push(rawLines[i].replace(re, ''))

    }

    return lines
}

const readFileAsync = async (path, input_delimiter) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {
            encoding: 'utf-8'
        }, (err, data) => {
            let lines = []
            let rawLines = data.split(input_delimiter)
            re = RegExp(input_delimiter)
            for (var i = 0; i < rawLines.length; i++) {
                lines.push(rawLines[i].replace(re, ''))
            }
            resolve(lines)
        });
    });
}

const writeFile = (data, path) => {
    fs.writeFileSync(path, data)
}

const removeDuplicates = lines => {
    let re = RegExp('^\s*$')
    return lines.filter((value, index, self) => {
        if (value.match(re)) {
            return true
        }
        return self.indexOf(value) === index;
    })
}

const removeBlanks = lines => {
    let re = RegExp('^\s*$')
    return lines.filter((value, index, self) => {
        return !value.match(re)
    })
}

const lowerCase = lines => {
    return lines.map(line => {
        return line.toLowerCase()
    })
}

const removeKeyword = (lines, keyword, ignoreCase) => {
    return lines.filter(line => {
        if (ignoreCase) {
            return !line.toLowerCase().includes(keyword.toLowerCase())
        } else {
            return !line.includes(keyword)
        }
    })
}
const removeBeforeKeyword = (lines, keyword, ignoreCase) => {
    return lines.filter((value, index, self) => {
        if (index == self.length - 1) {
            return true
        }
        if (ignoreCase) {
            return !self[index + 1].toLowerCase().includes(keyword.toLowerCase())
        } else {
            return !self[index + 1].includes(keyword)
        }
    })
}
const removeAfterKeyword = (lines, keyword, ignoreCase) => {
    return lines.filter((value, index, self) => {
        if (index == 0) {
            return true
        }
        if (ignoreCase) {
            return !self[index - 1].toLowerCase().includes(keyword.toLowerCase())
        } else {
            return !self[index - 1].includes(keyword)
        }
    })
}

const findInDir = (dir, recursive, filter = undefined, isBlacklist, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory()) {
            if (recursive) {
                findInDir(filePath, recursive, filter, isBlacklist, fileList);
            }
        } else if (filter != undefined) {
            if (filter.test(filePath) != isBlacklist) {
                fileList.push(filePath);
            }
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
}

const listToFilter = list => {
    let regexString = ''
    let i = 0;
    list.forEach(ext => {
        if (i > 0) {
            regexString += '|'
        }
        regexString += `.*\.${ext}$`
        i++;
    });
    return RegExp(regexString)
}

module.exports = {
    removeDuplicates,
    removeBlanks,
    lowerCase,
    removeKeyword,
    removeBeforeKeyword,
    removeAfterKeyword,
    readFile,
    readFileAsync,
    writeFile,
    findInDir,
    listToFilter
}
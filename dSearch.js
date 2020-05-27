const fs = require('fs')
const {
    readFile,
    readFileAsync,
    writeFile,
    findInDir,
    listToFilter,
    lowerCase
} = require('./Shared/methods')

const dSearch = async (startPath, keys, args) => {
    const dirSearch = fs.lstatSync(startPath).isDirectory()
    if (args.keys) {
        keys = keys.split(',')
    } else {
        keys = readFile(key, args.input_delimiter)
    }
    let originalKeys = keys.slice(0)
    if (args.ignore_case) {
        keys = lowerCase(keys)
    }

    let filter;
    let isBlacklist = false;
    if (args.whitelist != undefined) {
        if (args.blacklist != undefined) {
            console.log('blacklist ignored.')
        }
        filter = listToFilter(args.whitelist.split(','))
        console.log('Filter set based on whitelist')
    } else if (args.blacklist != undefined) {
        isBlacklist = true;
        filter = listToFilter(args.blacklist.split(','))
        console.log('Filter set based on blacklist')
    }
    console.log('Getting files..')
    let files;
    if(dirSearch){
        files = findInDir(startPath, args.recursive, filter, isBlacklist)
    }else{
        files = [startPath]
    }
    searches = []
    files.forEach(filepath => {
        searches.push(_searchFile(filepath, keys, args))
    });
    let results = []
    results = await Promise.allSettled(searches)

    let temp = []
    results.forEach(result => {
        result.value.forEach(v => {
            temp.push(v)
        });
    })
    results = temp
    temp = undefined

    console.log('Aggregating results..')
    results = _aggregateResults(results, originalKeys, args);
    if(args.sort && !args.sort_occurance){
        let sortedKeys = originalKeys.slice(0).sort()
        results = results.sort((a,b)=>{
            if(a.key == 'min'){return 1}
            else if(b.key == 'min'){return -1}
            return sortedKeys.indexOf(a.key) - sortedKeys.indexOf(b.key)
        })
    }else if(args.sort_occurance){
        results = results.sort((a,b)=>{
            if(a.key == 'min'){return 1}
            else if(b.key == 'min'){return -1}
            return b.occurances - a.occurances
        })
    }
    if(args.reverse){
        let minn = results.pop()
        results = results.reverse()
        results.push(minn)
    }
    resultString = _stringifyResults(results, args)

    if (args.print) {
        console.log('')
        console.log(resultString)
    } else {
        console.log(`Saving file at: ${args.output}`)
        writeFile(resultString, args.output)
    }
}

const _stringifyResults = (results, args) => {
    let result = []
    for (let i = 0; i < results.length - 1; i++) {
        let keyResults = results[i];
        if (args.detail) {
            let currentString = `${keyResults.key}:\n`;
            for (let j = 0; j < keyResults.files.length; j++) {
                let fileResults = keyResults.files[j];
                currentString += `\t${fileResults.occurances} ${fileResults.occurances == 1? "occurance": "occurances"} found in ${fileResults.filepath}:\n`;
                for (let k = 0; k < fileResults.results.length; k++) {
                    let result = fileResults.results[k];
                    currentString += `\t\t"${result.line}" @${result.lineIndex}:${result.ocIndex}\n`;
                }
                currentString += '\n'
            }
            result.push(currentString)
        }
        if (!args.detail) {
            if (args.occurances) {
                result.push(`${keyResults.key}: ${keyResults.occurances}`)
            } else {
                if (keyResults.files.length > 0) {
                    result.push(`${keyResults.key}`)
                }
            }
        }
    }

    if (args.occurances || args.detail) {
        result.push('')
        result.push(`Minimum occurance: ${results[results.length-1].minOccurances}`)
    }
    return result.join(args.output_delimiter)
}

const _aggregateResults = (searchResults, keys, args) => {
    results = []
    filepathKeyMap = []
    keys.forEach(key => {
        results.push({
            key: key,
            files: [],
            occurances: 0
        })
        filepathKeyMap.push({
            key: key,
            filepaths: []
        })
    });

    for (let i = 0; i < searchResults.length; i++) {
        let result = searchResults[i];
        let resultFileIndex = filepathKeyMap[result.key].filepaths.indexOf(result.filepath);
        if (resultFileIndex == -1) {
            filepathKeyMap[result.key].filepaths.push(result.filepath)
            results[result.key].files.push({
                filepath: result.filepath,
                results: [],
                occurances: 0
            })
            resultFileIndex = results[result.key].files.length - 1;
        }
        results[result.key].files[resultFileIndex].results.push({
            line: result.line,
            lineIndex: result.lineIndex,
            ocIndex: result.ocIndex
        })
        results[result.key].files[resultFileIndex].occurances++;
        results[result.key].occurances++;
    }
    let minOccurances = -1;
    for (let i = 0; i < results.length; i++) {
        if (results[i].occurances < minOccurances || minOccurances == -1) {
            minOccurances = results[i].occurances;
        }
    }
    results.push({
        key:'min',
        minOccurances: minOccurances
    })
    return results;
}

const _searchFile = async (filepath, keys, args) => {
    let lines = await readFileAsync(filepath, args.input_delimiter);
    results = []
    let lineIndex = 0;
    lines.forEach(line => {
        for (let i = 0; i < keys.length; i++) {
            if (args.ignore_case) {
                if (line.toLowerCase().includes(keys[i])) {
                    results.push({
                        filepath: filepath,
                        line: line,
                        key: i,
                        lineIndex: lineIndex,
                        ocIndex: line.indexOf(key[i])
                    })
                }
            } else {
                if (line.includes(keys[i])) {
                    results.push({
                        filepath: filepath,
                        line: line,
                        key: i,
                        lineIndex: lineIndex,
                        ocIndex: line.indexOf(keys[i])
                    })
                }
            }
        }
        lineIndex++;
    });
    return results;
}

module.exports = {
    dSearch
}
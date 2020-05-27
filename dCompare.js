const {
    readFile,
    writeFile,
    removeDuplicates,
    removeBlanks
} = require('./Shared/methods')

const dCompare = (filepathA, filepathB, args) => {
    linesA = readFile(filepathA, args.input_delimiter)
    linesB = readFile(filepathB, args.input_delimiter)
    linesA = removeDuplicates(linesA)
    linesA = removeBlanks(linesA)
    linesB = removeDuplicates(linesB)
    linesB = removeBlanks(linesB)
    let matched = []
    for (let i = 0; i < linesA.length; i++) {
        for (let j = 0; j < linesB.length; j++) {
            let a = args.ignore_case ? linesA[i].toLowerCase() : linesA[i];
            let b = args.ignore_case ? linesB[j].toLowerCase() : linesB[j];
            if (a == b) {
                matched.push(`${i}`)
            }
        }
    }
    matched = removeDuplicates(matched)
    results = []
    for (let i = 0; i < linesA.length; i++) {
        if (matched.includes(`${i}`)) {
            continue
        }
        results.push(linesA[i])
    }
    if (results.length > 0) {
        if (args.sort) {
            results = results.sort()
        }
        if (args.reverse) {
            results = results.reverse()
        }
        if (args.print) {
            console.log(`Missing keys for: ${filepathB}`)
            let printString = ""
            for (let i = 0; i < results.length; i++) {
                printString += results[i]
                if (i < results.length - 1) {
                    printString += args.output_delimiter
                }
            }
            console.log(printString)
            console.log('')
        } else {
            console.log(`Saving file at: ${args.output}`)
            writeFile(results.join(args.output_delimiter), args.output)
        }
    } else {
        console.log(`No keys from ${filepathA} were missing from ${filepathB}`)
    }
}

module.exports = {
    dCompare
}
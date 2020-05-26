const {
    readFile,
    writeFile,
    removeDuplicates,
    removeBlanks,
    lowerCase,
    removeKeyword,
    removeBeforeKeyword,
    removeAfterKeyword} = require('./Shared/methods')


const dProcess = (file, args) =>{
    // console.log(args)
    console.log('Reading input file...')
    lines = readFile(file, args.input_delimiter)
    if(args.lower){
        console.log('Lower casing every entry..')
        lines = lowerCase(lines);
    }
    if(args.duplicates){
        console.log('Removing duplicates..')
        lines = removeDuplicates(lines);
    }
    if(args.blank_entries){
        console.log('Removing blank entries..')
        lines = removeBlanks(lines);
    }
    if(args.remove_keyword){
        console.log(`Removing entries containing keyword: ${args.remove_keyword}..`)
        lines = removeKeyword(lines, args.remove_keyword);
    }
    if(args.remove_after){
        console.log(`Removing entries after keyword: ${args.remove_after}..`)
        lines = removeAfterKeyword(lines, args.remove_after);
    }
    if(args.remove_before){
        console.log(`Removing entries before keyword: ${args.remove_before}..`)
        lines = removeBeforeKeyword(lines, args.remove_before);
    }
    if(args.sort){
        console.log('Sorting entries..')
        lines = lines.sort();
    }
    if(args.reverse){
        console.log('Reversing entries..')
        lines = lines.reverse();
    }


    if(args.print){
        console.log('')
        let printString = ""
        for(let i = 0; i< lines.length; i++){
            printString += lines[i]
            if(i < lines.length -1){
                printString += args.output_delimiter
            }
        }
        console.log(printString)
        console.log('')
    }else{
        console.log(`Saving file at: ${args.output}`)
        writeFile(lines.join(args.output_delimiter), args.output)
    }
}

const compare = (filepathA, filepathB, args) =>{
    linesA = readFile(filepathA, args.input_delimiter)
    linesB = readFile(filepathB, args.input_delimiter)
    linesA = removeDuplicates(linesA)
    linesA = removeBlanks(linesA)
    linesB = removeDuplicates(linesB)
    linesB = removeBlanks(linesB)
    let matched = []
    for(let i = 0; i< linesA.length; i++){
        for(let j = 0; j< linesB.length; j++){
            let a = args.ignore_case ? linesA[i].toLowerCase() : linesA[i];
            let b = args.ignore_case ? linesB[j].toLowerCase() : linesB[j];
            if(a == b){matched.push(`${i}`)}
        }
    }
    matched = removeDuplicates(matched)
    results = []
    for(let i = 0; i< linesA.length; i++){
        if(matched.includes(`${i}`)){continue}
        results.push(linesA[i])
    }
    if(results.length > 0){
        if(args.sort){
            results = results.sort()
        }
        if(args.reverse){
            results = result.reverse()
        }
        if(args.print){
            console.log(`Missing keys for: ${filepathB}`)
            let printString = ""
            for(let i = 0; i< results.length; i++){
                printString += results[i]
                if(i < results.length -1){
                    printString += args.output_delimiter
                }
            }
            console.log(printString)
            console.log('')
        }else{
            console.log(`Saving file at: ${args.output}`)
            writeFile(results.join(args.output_delimiter), args.output)
        }
    }else{
        console.log(`No keys from ${filepathA} were missing from ${filepathB}`)
    }
}

module.exports = {
    dProcess,
    compare
}
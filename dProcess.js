const {
    readFile,
    writeFile,
    removeDuplicates,
    removeBlanks,
    lowerCase,
    removeKeyword,
    removeBeforeKeyword,
    removeAfterKeyword
} = require('./Shared/methods')


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
        lines = removeKeyword(lines, args.remove_keyword, args.ignore_case);
    }
    if(args.remove_after){
        console.log(`Removing entries after keyword: ${args.remove_after}..`)
        lines = removeAfterKeyword(lines, args.remove_after, args.ignore_case);
    }
    if(args.remove_before){
        console.log(`Removing entries before keyword: ${args.remove_before}..`)
        lines = removeBeforeKeyword(lines, args.remove_before, args.ignore_case);
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

module.exports = {
    dProcess
}
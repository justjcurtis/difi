#!/usr/bin/env node
cli = require('commander')
prompt = require('inquirer')
path = require('path')

const { dProcess, compare } = require('./index.js')

cli
    .version('1.0.0')
    .description('a simple data manipulation, processing & cleaning utility.')

cli
    .command('process [filepath]')
    .alias('p')
    .description('processes file supplied with processing flags supplied.')
    .option('-b, --blank_entries', 'removes blank entries')
    .option('-d, --duplicates', 'remove duplicates')
    .option('-l, --lower', 'make file lower case')
    .option('-id, --input_delimiter', 'specifies input delimiter (defaults to \\n)')
    .option('-od, --output_delimiter', 'specifies output delimiter (defaults to input delimiter)')
    .option('-s, --sort', 'sorts output')
    .option('-rv, --reverse', 'reverses output (done after sort)')
    .option('-rf, --replace_file', 'replaces original file with output')
    .option('-rk, --remove_keyword <keyword>', 'removes entries with specified keyword')
    .option('-rb, --remove_before <keyword>', 'removes entry before keyword')
    .option('-ra, --remove_after <keyword>', 'removes entry after keyword')
    .option('-p, --print', 'prevents saving and instead, prints output to console')
    .option('-o, --output', 'specifies output file (defaults to inputfile_difi')
    .action(function(filepath, args){
        if(args.input_delimiter == undefined){
            args.input_delimiter = '\n'
        }
        if(args.output_delimiter == undefined){
            args.output_delimiter = args.input_delimiter
        }
        if(!args.print){
            if(args.replace_file){
                args.output = filepath
            }else if(args.output == undefined){
                let parsedPath = path.parse(filepath)
                args.output = path.join(parsedPath.dir, parsedPath.name + "_difi" + parsedPath.ext)
            }
        }
        dProcess(filepath, args)
    })

cli
    .command('compare [filepathA] [filepathB]')
    .alias('c')
    .description('compares two files and displays missing entries in second file')
    .option('-f, --flip', 'flips comparison tp show keys missing in the first file')
    .option('-i, --ignore_case', 'ignores case when comparing entries')
    .option('-id, --input_delimiter', 'specifies input delimiter (defaults to \\n)')
    .option('-od, --output_delimiter', 'specifies output delimiter (defaults to input delimiter)')
    .option('-s, --sort', 'sorts output')
    .option('-rv, --reverse', 'reverses output (done after sort)')
    .option('-p, --print', 'prevents saving and instead, prints output to console')
    .option('-o, --output', 'specifies output file (defaults to inputfile_difiCompare')
    .action(function(filepathA, filepathB, args){
        if(args.input_delimiter == undefined){
            args.input_delimiter = '\n'
        }
        if(args.output_delimiter == undefined){
            args.output_delimiter = args.input_delimiter
        }
        if(!args.print){
            if(args.output == undefined){
                let parsedPath = path.parse(filepath)
                args.output = path.join(parsedPath.dir, parsedPath.name + "_difiCompare" + parsedPath.ext)
            }
        }
        if(args.flip){
            let _ = filepathA;
            filepathA = filepathB;
            filepathB = _;
        }
        compare(filepathA, filepathB, args)
    })

cli.parse(process.argv)
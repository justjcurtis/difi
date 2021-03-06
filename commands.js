#!/usr/bin/env node

cli = require('commander')
path = require('path')

const {
    dProcess,
    dCompare,
    dSearch
} = require('./index.js')

cli
    .version('1.1.1')
    .description('a simple data manipulation, processing & cleaning utility.')

cli
    .command('process <filepath>')
    .alias('p')
    .description('processes file supplied with processing flags supplied.')
    .option('-b, --blank_entries', 'removes blank entries.')
    .option('-d, --duplicates', 'remove duplicates.')
    .option('-i, --ignore_case', 'ignores case when comparing entries to keywords.')
    .option('-l, --lower', 'make file lower case.')
    .option('-id, --input_delimiter <delimiter>', 'specifies input delimiter (defaults to \\n).')
    .option('-od, --output_delimiter <delimiter>', 'specifies output delimiter (defaults to input delimiter).')
    .option('-s, --sort', 'sorts output.')
    .option('-rv, --reverse', 'reverses output (done after sort).')
    .option('-rf, --replace_file', 'replaces original file with output.')
    .option('-rk, --remove_keyword <keyword>', 'removes entries with specified keyword.')
    .option('-rb, --remove_before <keyword>', 'removes entry before keyword.')
    .option('-ra, --remove_after <keyword>', 'removes entry after keyword.')
    .option('-p, --print', 'prevents saving and instead, prints output to console.')
    .option('-o, --output', 'specifies output file (defaults to inputfile_difi).')
    .action(function (filepath, args) {
        if (args.input_delimiter == undefined) {
            args.input_delimiter = '\n'
        }
        if (args.output_delimiter == undefined) {
            args.output_delimiter = args.input_delimiter
        }
        if (!args.print) {
            if (args.replace_file) {
                args.output = filepath
            } else if (args.output == undefined) {
                let parsedPath = path.parse(filepath)
                args.output = path.join(parsedPath.dir, parsedPath.name + "_difi" + parsedPath.ext)
            }
        }
        dProcess(filepath, args)
    })

cli
    .command('compare <filepathA> <filepathB>')
    .alias('c')
    .description('compares two files and displays missing entries in second file.')
    .option('-f, --flip', 'flips comparison tp show keys missing in the first file.')
    .option('-i, --ignore_case', 'ignores case when comparing entries.')
    .option('-id, --input_delimiter <delimiter>', 'specifies input delimiter (defaults to \\n).')
    .option('-od, --output_delimiter <delimiter>', 'specifies output delimiter (defaults to input delimiter).')
    .option('-s, --sort', 'sorts output.')
    .option('-rv, --reverse', 'reverses output (done after sort).')
    .option('-p, --print', 'prevents saving and instead, prints output to console.')
    .option('-o, --output', 'specifies output file (defaults to inputfile_difiCompare.')
    .action(function (filepathA, filepathB, args) {
        if (args.input_delimiter == undefined) {
            args.input_delimiter = '\n'
        }
        if (args.output_delimiter == undefined) {
            args.output_delimiter = args.input_delimiter
        }

        if (args.flip) {
            let _ = filepathA;
            filepathA = filepathB;
            filepathB = _;
        }

        if (!args.print) {
            if (args.output == undefined) {
                let parsedPath = path.parse(filepathB)
                args.output = path.join(parsedPath.dir, parsedPath.name + "_difiCompare" + parsedPath.ext)
            }
        }
        dCompare(filepathA, filepathB, args)
    })

cli
    .command('search <startPath> <keys>')
    .alias('s')
    .description('search a file or directory structure using a list of keys.')
    .option('-i, --ignore_case', 'ignores case when searching for keys.')
    .option('-r, --recursive', 'search recursively into subdirectories.')
    .option('-k, --keys', 'allows keys to be entered directly into the terminal as the second argument as comma seperated values.')
    .option('-id, --input_delimiter <delimiter>', 'specifies input delimiter (defaults to \\n).')
    .option('-od, --output_delimiter <delimiter>', 'specifies output delimiter (defaults to input delimiter).')
    .option('-oc, --occurances', 'list occurances of each key along with the minimum occurance for all keys.')
    .option('-d --detail', 'show filepath & line number for each match.')
    .option('-bl --blacklist <csvFilter>', 'blacklist filetypes to be excluded from the search in the form of comma seperated values.')
    .option('-wl --whitelist <csvFilter>', 'whitelist filetypes to be included in the search in the form of comma seperated values (overrides blacklist).')
    .option('-s, --sort', 'sort output by key.')
    .option('-so, --sort_occurance', 'sort output by occurance, enables -oc & overrides -s.')
    .option('-rv, --reverse', 'reverses output (done after sort).')
    .option('-p, --print', 'prevents saving and instead, prints output to console.')
    .option('-o, --output <outputPath>', 'specifies output file for search results (defaults to parentDir_of_startPath/startPathFileName_difiSearch.txt).')
    .action(function (startPath, keys, args) {
        if (args.input_delimiter == undefined) {
            args.input_delimiter = '\n'
        }
        if (args.output_delimiter == undefined) {
            args.output_delimiter = args.input_delimiter
        }

        if (!args.print) {
            if (args.output == undefined) {
                let parsedPath = path.parse(startPath)
                args.output = path.join(parsedPath.dir, parsedPath.name + "_difiSearch.txt")
            }
        }
        dSearch(startPath, keys, args)
    })

cli.parse(process.argv)
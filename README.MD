# difi - V1.0.1

A small cli for manipulating, processing & cleaning data.


## Prerequisites

All you need to use difi is a command line and node :)

## Installing

Simply open up a terminal and type 

```
npm i @justjcurtis/difi -g
```

## Usage

After installing type:
```
difi -h
```
to see general help.

For more detailed usage info type:
```
difi -h [command]
```

### Available commands

#### **process|p** *[options] [filepath]* : processes file supplied with processing flags supplied.

#### process function [p] {inputFile} {args}
- Remove blank entries [-b] - *removes blank entries.*
- Remove duplicates [-d] - *remove duplicates.*
- Ignore case [-i] - *ignores case when comparing entries to keywords.*
- lowercase [-l] - *make file lower case.*
- Input delimiter [-id {delimiter}] - *specifies input delimiter (defaults to \\n).*
- Output delimiter [-od {delimiter}] - *specifies output delimiter (defaults to input delimiter).*
- Sorting [-s] - *sorts output.*
- Reversing [-rv] - *reverses output (done after sort).*
- Replace file [-rf] - *replaces original file with output.*
- Remove keyword [-rk {keyword}] - *removes entries with specified keyword.*
- Remove before keyword [-rb {keyword}] - *removes entry before keyword.*
- Remove after keyword [-ra {keyword}] - *removes entry after keyword.*
- Print [-p] - *prevents saving and instead, prints output to console.*
- Output [-o {path}] - *specifies output file (defaults to inputfile_difi).*

#### **compare|c** *[options] [filepathA] [filepathB]* : compares two files and displays missing entries in second file

- Flip [-f] - *flips comparison tp show keys missing in the first file.*
- Ignore case [-i] - *ignores case when comparing entries.*
- Input delimiter [-id {delimiter}] - *specifies input delimiter (defaults to \\n).*
- Output delimiter [-od {delimiter}] - *specifies output delimiter (defaults to input delimiter).*
- Sorting [-s] - *sorts output.*
- Reversing [-rv] - *reverses output (done after sort).*
- Print [-p] - *prevents saving and instead, prints output to console.*
- Output [-o] - *specifies output file (defaults to inputfile_difiCompare.*
## Roadmap

- Add search function for searching all files within provided directory (& subdirectories if indicated by flags) for keys provided; showing output in various forms determined by flags provided.
- Add unit tests for search function.
- Increase unit test coverage to include shared method files.
- Extend functionality by accepting regex patterns for searching, keywords etc.
- much more...

## Built With

* [Nodejs](https://nodejs.org/) - The framework used
* [Commanderjs](https://github.com/tj/commander.js/) - For cli argument parsing

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/justjcurtis/difi/tags). 

## Authors

* **Jacson Curtis** - *Project Owner* - [justjcurtis](https://github.com/justjcurtis)

See also the list of [contributors](https://github.com/justjcurtis/difi/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowlegements

* This project was inspired by [lcNrD](https://github.com/Jabrils/lcNrD) by [**Jabrils**](https://github.com/Jabrils).

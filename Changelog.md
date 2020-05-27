# difi
## V1.1.0 - 27/05/2020
### Search function
- Added Ignore_case [-i] - *ignores case when searching for keys.*
- Added Recursive [-r] - *search recursively into subdirectories.*
- Added Keys [-k] - *allows keys to be entered directly into the terminal as the second argument as comma seperated values.*
- Added Input_delimiter [-id] <delimiter> - *specifies input delimiter (defaults to \n).*
- Added Output_delimiter [-od] <delimiter> - *specifies output delimiter (defaults to input delimiter).*
- Added Occurances [-oc] - *list occurances of each key along with the minimum occurance for all keys.*
- Added Detail [-d] - *show filepath & line number for each match.*
- Added Blacklist [-bl] <csvFilter> - *blacklist filetypes to be excluded from the search in the form of comma seperated values.*
- Added Whitelist [-wl] <csvFilter> - *whitelist filetypes to be included in the search in the form of comma seperated values (overrides blacklist).*
- Added Sort [-s] - *sort output by key.*
- Added Sort_occurance [-so] - *sort output by occurance, enables -oc & overrides -s.*
- Added Reverse [-rv] - *reverses output (done after sort).*
- Added Print [-p] - *prevents saving and instead, prints output to console.*
- Added Output [-o] <outputPath> - *specifies output file for search results (defaults toparentDir_of_startPath/startPathFileName_difiSearch.txt).*
## V1.0.1 - 26/05/2020
### Naming update
- changed name to @justjcurtis/difi to avoid conflicts
## V1.0.0 - 26/05/2020
### Initial release :D
#### process function [p] {inputFile} {args}
- Added Remove blank entries [-b] - *removes blank entries.*
- Added Remove duplicates [-d] - *remove duplicates.*
- Added Ignore case [-i] - *ignores case when comparing entries to keywords.*
- Added lowercase [-l] - *make file lower case.*
- Added Input delimiter [-id {delimiter}] - *specifies input delimiter (defaults to \\n).*
- Added Output delimiter [-od {delimiter}] - *specifies output delimiter (defaults to input delimiter).*
- Added Sorting [-s] - *sorts output.*
- Added Reversing [-rv] - *reverses output (done after sort).*
- Added Replace file [-rf] - *replaces original file with output.*
- Added Remove keyword [-rk {keyword}] - *removes entries with specified keyword.*
- Added Remove before keyword [-rb {keyword}] - *removes entry before keyword.*
- Added Remove after keyword [-ra {keyword}] - *removes entry after keyword.*
- Added Print [-p] - *prevents saving and instead, prints output to console.*
- Added Output [-o {path}] - *specifies output file (defaults to inputfile_difi)*
#### compare function [c] {filepathA} {filepathB} {args}
- Added Flip [-f] - *flips comparison tp show keys missing in the first file*
- Added Ignore case [-i] - *ignores case when comparing entries*
- Added Input delimiter [-id {delimiter}] - *specifies input delimiter (defaults to \\n)*
- Added Output delimiter [-od {delimiter}] - *specifies output delimiter (defaults to input delimiter)*
- Added Sorting [-s] - *sorts output*
- Added Reversing [-rv] - *reverses output (done after sort)*
- Added Print [-p] - *prevents saving and instead, prints output to console*
- Added Output [-o] - *specifies output file (defaults to inputfile_difiCompare*

# difi
## V1.0.0 - 25/05/2020
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

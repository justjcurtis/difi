const fs = require('fs')
const {
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
} = require('./Shared/methods')

const testFile = 'TestData/sharedMethods/ijk.txt'
const recursiveFile = 'TestData/sharedMethods/recursive/r.xtx'
const recursiveTxtFile = 'TestData/sharedMethods/recursive/r.txt'
const testDir = 'TestData/sharedMethods/'
const ijkLines = [
    'i',
    '',
    'k',
    'i',
    'J',
    'pre',
    'key',
    'pos'
]
const ijkLinesNoBlankEntries = [
    'i',
    'k',
    'i',
    'J',
    'pre',
    'key',
    'pos'
]
const ijkLinesNoDuplicates = [
    'i',
    '',
    'k',
    'J',
    'pre',
    'key',
    'pos'
]

const ijkLinesLowerCase = [
    'i',
    '',
    'k',
    'i',
    'j',
    'pre',
    'key',
    'pos'
]

const ijkLinesNoJ = [
    'i',
    '',
    'k',
    'i',
    'pre',
    'key',
    'pos'
]

const ijkLinesNoKey = [
    'i',
    '',
    'k',
    'i',
    'J',
    'pre',
    'pos'
]

const ijkLinesNoPre = [
    'i',
    '',
    'k',
    'i',
    'J',
    'key',
    'pos'
]

const ijkLinesNoPos = [
    'i',
    '',
    'k',
    'i',
    'J',
    'pre',
    'key',
]

fs.unlinkSync(testFile)

test('Shared Methods: writeFile', async () => {
    let success = false;
    try {
        writeFile(ijkLines.slice(0).join('\n'), testFile)
        success = true;
    } catch (error) {}
    expect(success).toBe(true)
})
 
test('Shared Methods: readFile', async () => {
    let lines = readFile(testFile, '\n')
    expect(lines.join()).toBe(ijkLines.slice(0).join())
})

test('Shared Methods: readFileAsync', async () => {
    let lines = await readFileAsync(testFile, '\n')
    expect(lines.join()).toBe(ijkLines.slice(0).join())
})

test('Shared Methods: removeDuplicates', async () => {
    expect(removeDuplicates(ijkLines.slice(0)).join()).toBe(ijkLinesNoDuplicates.slice(0).join())
})

test('Shared Methods: removeBlanks', async () => {
    expect(removeBlanks(ijkLines.slice(0)).join()).toBe(ijkLinesNoBlankEntries.slice(0).join())
})

test('Shared Methods: lowerCase', async () => {
    expect(lowerCase(ijkLines.slice(0)).join()).toBe(ijkLinesLowerCase.slice(0).join())
})

test('Shared Methods: removeKeyword', async () => {
    // nothing to remove as ignore case is not active
    expect(removeKeyword(ijkLines.slice(0), 'j').join()).toBe(ijkLines.slice(0).join())
    // removes J as ignore case is not active
    expect(removeKeyword(ijkLines.slice(0), 'J').join()).toBe(ijkLinesNoJ.slice(0).join())
    // removes J as ignore case is active
    expect(removeKeyword(ijkLines.slice(0), 'j', true).join()).toBe(ijkLinesNoJ.slice(0).join())

    // removes key ignore case active
    expect(removeKeyword(ijkLines.slice(0), 'key', true).join()).toBe(ijkLinesNoKey.slice(0).join())
})

test('Shared Methods: removeBeforeKeyword', async () => {
    // nothing to remove as ignore case is not active
    expect(removeBeforeKeyword(ijkLines.slice(0), 'Key').join()).toBe(ijkLines.slice(0).join())

    // removes pre as ignore case is not active
    expect(removeBeforeKeyword(ijkLines.slice(0), 'key').join()).toBe(ijkLinesNoPre.slice(0).join())
    // removes pre as ignore case is not active
    expect(removeBeforeKeyword(ijkLines.slice(0), 'Key', true).join()).toBe(ijkLinesNoPre.slice(0).join())
})

test('Shared Methods: removeAfterKeyword', async () => {
    // nothing to remove as ignore case is not active
    expect(removeAfterKeyword(ijkLines.slice(0), 'Key').join()).toBe(ijkLines.slice(0).join())

    // removes pre as ignore case is not active
    expect(removeAfterKeyword(ijkLines.slice(0), 'key').join()).toBe(ijkLinesNoPos.slice(0).join())
    // removes pre as ignore case is not active
    expect(removeAfterKeyword(ijkLines.slice(0), 'Key', true).join()).toBe(ijkLinesNoPos.slice(0).join())
})

test('Shared Methods: listToFilter', async () => {
    const list = ['txt', 'js']
    const filter = listToFilter(list)
    
    expect(filter.test('.txt')).toBe(true)
    expect(filter.test('.js')).toBe(true)
    expect(filter.test('.t')).toBe(false)
    expect(filter.test('.s')).toBe(false)

    expect(filter.test('blahblah/blah.txt')).toBe(true)
    expect(filter.test('blahblah/blah.js')).toBe(true)
    expect(filter.test('blahblah/blah.t')).toBe(false)
    expect(filter.test('blahblah/blah.s')).toBe(false)
})

test('Shared Methods: findInDir', async () => {
    const txtFilter = listToFilter(['txt'])
    const expectedFileList = [testFile]
    const expectedFileListRecursive = [testFile, recursiveTxtFile, recursiveFile]
    const expectedFileListTxtWL = [testFile]
    const expectedFileListTxtBL = []
    const expectedFileListRecursiveTxtWL = [testFile, recursiveTxtFile]
    const expectedFileListRecursiveTxtBL = [recursiveFile]

    // nofilter
    expect(findInDir(testDir, false).join()).toBe(expectedFileList.slice(0).join())
    expect(findInDir(testDir, true).join()).toBe(expectedFileListRecursive.slice(0).join())

    // txt whitelist test
    expect(findInDir(testDir, false, txtFilter, false).join()).toBe(expectedFileListTxtWL.slice(0).join())
    expect(findInDir(testDir, true, txtFilter, false).join()).toBe(expectedFileListRecursiveTxtWL.slice(0).join())

    // txt blacklist test
    expect(findInDir(testDir, false, txtFilter, true).join()).toBe(expectedFileListTxtBL.slice(0).join())
    expect(findInDir(testDir, true, txtFilter, true).join()).toBe(expectedFileListRecursiveTxtBL.slice(0).join())
})
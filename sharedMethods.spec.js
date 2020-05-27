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
} = require('./Shared/testMethods')

const {
    expectedMissing,
    expectedMissingIgnoreCase
} = require('./TestData/consts')

test('placeholder', async () => {
    expect(0).toBe(0)
})
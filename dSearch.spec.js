const {
    readFile,
    cli
} = require('./Shared/testMethods')

const {
    expectedMissing,
    expectedMissingIgnoreCase
} = require('./TestData/consts')

const testDir = './TestData/'
const testFileA = './TestData/keys.txt'
const linesA = readFile(testFileA, '\n')

test('Search: Code should be 0', async () => {
    let result = await  cli([`s ${testDir} ${testFileA}`, '-p'], '.');
    expect(result.code).toBe(0);
});
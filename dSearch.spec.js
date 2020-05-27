const {
    readFile,
    cli
} = require('./Shared/testMethods')

const {
    expectedMissing,
    expectedMissingIgnoreCase
} = require('./TestData/consts')

const testDirA = './TestData/'
const testDirB = './TestData/testDir/'
const testFileA = './TestData/keys.txt'
const testFileB = './TestData/keys_difi.txt'
const linesA = readFile(testFileA, '\n')
const linesB = readFile(testFileB, '\n')

test('Search: Code should be 0', async () => {
    let result = await  cli([`s ${testDirA} ${testFileA}`, '-p'], '.');
    expect(result.code).toBe(0);
});

test('Search: -p Should read file keys from file and search non-recursively', async () => {
    let result = await  cli([`s ${testDirA} ${testFileB}`, '-p'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${linesB.join('\n')}\n`);
});
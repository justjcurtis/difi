const {
    cli
} = require('./Shared/testMethods')

const {
    expectedMissing,
    expectedMissingIgnoreCase
} = require('./TestData/consts')

const testFileA = './TestData/keys.txt'
const testFileB = './TestData/keys_difi.txt'

// Test for compare
test('Compare: Code should be 0', async () => {
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p'], '.');
    expect(result.code).toBe(0);
});

test('Compare: Missing keys should match exptected', async () => {
    const expectedMissingKeys = expectedMissing.slice(0).join('\n')
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p'], '.');
    expect(result.stdout).toBe(`Missing keys for: ${testFileB}\n${expectedMissingKeys}\n\n`)
});

test('Compare: -s Missing keys should be sorted', async () => {
    const expectedMissingKeys = expectedMissing.slice(0).sort().join('\n')
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-s'], '.');
    expect(result.stdout).toBe(`Missing keys for: ${testFileB}\n${expectedMissingKeys}\n\n`)
});

test('Compare: -rv Missing keys should be reversed', async () => {
    const expectedMissingKeys = expectedMissing.slice(0).reverse().join('\n')
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-rv'], '.');
    expect(result.stdout).toBe(`Missing keys for: ${testFileB}\n${expectedMissingKeys}\n\n`)
});

test('Compare: -s -rv Missing keys should be sorted and then reversed', async () => {
    const expectedMissingKeys = expectedMissing.slice(0).sort().reverse().join('\n')
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-s', '-rv'], '.');
    expect(result.stdout).toBe(`Missing keys for: ${testFileB}\n${expectedMissingKeys}\n\n`)
});

test('Compare: -f for should flip a & b & show no missing keys', async () => {
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-f'], '.');
    expect(result.stdout).toBe(`No keys from ${testFileB} were missing from ${testFileA}\n`)
});

test('Compare: -i Missing keys should match exptected', async () => {
    const expectedMissingKeys = expectedMissingIgnoreCase.slice(0).join('\n')
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-i'], '.');
    expect(result.stdout).toBe(`Missing keys for: ${testFileB}\n${expectedMissingKeys}\n\n`)
});

test('Compare: -s -i Missing keys should be sorted', async () => {
    const expectedMissingKeys = expectedMissingIgnoreCase.slice(0).sort().join('\n')
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-s', '-i'], '.');
    expect(result.stdout).toBe(`Missing keys for: ${testFileB}\n${expectedMissingKeys}\n\n`)
});

test('Compare: -rv -i Missing keys should be reversed', async () => {
    const expectedMissingKeys = expectedMissingIgnoreCase.slice(0).reverse().join('\n')
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-rv', '-i'], '.');
    expect(result.stdout).toBe(`Missing keys for: ${testFileB}\n${expectedMissingKeys}\n\n`)
});

test('Compare: -s -rv -i Missing keys should be sorted and then reversed', async () => {
    const expectedMissingKeys = expectedMissingIgnoreCase.slice(0).sort().reverse().join('\n')
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-s', '-rv', '-i'], '.');
    expect(result.stdout).toBe(`Missing keys for: ${testFileB}\n${expectedMissingKeys}\n\n`)
});

test('Compare: -f -i for should flip a & b & show no missing keys', async () => {
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-f', '-i'], '.');
    expect(result.stdout).toBe(`No keys from ${testFileB} were missing from ${testFileA}\n`)
});
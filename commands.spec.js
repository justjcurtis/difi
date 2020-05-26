let path = require('path');
let exec = require('child_process').exec;
const {
    readFile
} = require('./Shared/testMethods')

test('Code should be 0 for process', async () => {
    const testFile = './TestData/keys.txt'
    let result = await  cli([`p ${testFile}`, '-p'], '.');
    expect(result.code).toBe(0);
});
test('process -p output should show entire contents of input file', async () => {
    const testFile = './TestData/keys.txt'
    let result = await  cli([`p ${testFile}`, '-p'], '.');
    const lines = readFile(testFile).join('\n')

    expect(result.stdout).toBe(`Reading input file...\n\n${lines}\n\n`)
});

test('Code should be 0 for compare', async () => {
    const testFileA = './TestData/keys.txt'
    const testFileB = './TestData/keys_difi.txt'
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p'], '.');
    expect(result.code).toBe(0);
});

test('Missing keys should match exptected', async () => {
    const testFileA = './TestData/keys.txt'
    const testFileB = './TestData/keys_difi.txt'
    const expectedMissingKeys = ['a', 'another missing key'].join('\n')
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p'], '.');
    expect(result.stdout).toBe(`Missing keys for: ./TestData/keys_difi.txt\n${expectedMissingKeys}\n\n`)
});

test('Compare -f for should flip a & b & show no missing keys', async () => {
    const testFileA = './TestData/keys.txt'
    const testFileB = './TestData/keys_difi.txt'
    let result = await  cli([`c ${testFileA} ${testFileB}`, '-p', '-f'], '.');
    expect(result.stdout).toBe(`No keys from ${testFileB} were missing from ${testFileA}\n`)
});

function cli(args, cwd) {
  return new Promise(resolve => { 
    exec(`node ${path.resolve('./commands.js')} ${args.join(' ')}`,
    { cwd }, 
    (error, stdout, stderr) => { resolve({
    code: error && error.code ? error.code : 0,
    error,
    stdout,
    stderr })
  })
})}
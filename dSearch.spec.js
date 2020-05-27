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

test('Search: -p -k Should accept csv keys and search non-recursively', async () => {
    let result = await  cli([`s ${testDirA} a,b,noneExistant,recursive`, '-p', '-k'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['a', 'b'].join('\n')}\n`);
});

test('Search: -p -k -r Should accept csv keys and search recursively', async () => {
    let result = await  cli([`s ${testDirA} b,a,noneExistant,recursive`, '-p', '-k', '-r'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['b', 'a', 'recursive'].join('\n')}\n`);
});

test('Search: -p -k -r -wl js Should accept csv keys and search recursively respecting whitelist for file extensions', async () => {
    let result = await  cli([`s ${testDirA} b,a,noneExistant,recursive`, '-p', '-k', '-r', '-wl js'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['b', 'a'].join('\n')}\n`);
});

test('Search: -p -k -r -bl txt Should accept csv keys and search recursively respecting blacklist for file extensions', async () => {
    let result = await  cli([`s ${testDirA} b,a,noneExistant,recursive`, '-p', '-k', '-r', '-bl txt'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['b', 'a'].join('\n')}\n`);
});

test('Search: -p -k -r -oc Should accept csv keys and search recursively & display occurances', async () => {
    let result = await  cli([`s ${testDirA} a,b,noneExistant,recursive`, '-p', '-k', '-r', '-oc'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['a: 34', 'b: 31', 'noneExistant: 0', 'recursive: 1'].join('\n')}\n\nMinimum occurance: 0\n`);
});

test('Search: -p -k -r -oc Should accept csv keys and search recursively & display occurances & minimum occurance should be correct', async () => {
    let result = await  cli([`s ${testDirA} a,b,recursive`, '-p', '-k', '-r', '-oc'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['a: 34', 'b: 31', 'recursive: 1'].join('\n')}\n\nMinimum occurance: 1\n`);
});

test('Search: -p -k -r -d Should accept csv keys and search recursively & display detailed view', async () => {
    let result = await  cli([`s ${testDirA} recursive`, '-p', '-k', '-r', '-d'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['recursive:', '\t1 occurance found in TestData/testDir/deep.txt:', '\t\t"recursive" @17:0'].join('\n')}\n\n\n\nMinimum occurance: 1\n`);
});

test('Search: -p -k -r -oc -s Should accept csv keys and search recursively & display occurances sorted alphabetically by key', async () => {
    let result = await  cli([`s ${testDirA} b,a,noneExistant,recursive`, '-p', '-k', '-r', '-oc', '-s'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['a: 34', 'b: 31', 'noneExistant: 0', 'recursive: 1'].join('\n')}\n\nMinimum occurance: 0\n`);
});

test('Search: -p -k -r -oc -s -rv Should accept csv keys and search recursively & display occurances sorted alphabetically by key & reverse', async () => {
    let result = await  cli([`s ${testDirA} b,a,noneExistant,recursive`, '-p', '-k', '-r', '-oc', '-s', '-rv'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['a: 34', 'b: 31', 'noneExistant: 0', 'recursive: 1'].reverse().join('\n')}\n\nMinimum occurance: 0\n`);
});

test('Search: -p -k -r -oc -so Should accept csv keys and search recursively & display occurances sorted by occurance', async () => {
    let result = await  cli([`s ${testDirA} b,a,noneExistant,recursive`, '-p', '-k', '-r', '-oc', '-so'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['a: 34', 'b: 31', 'recursive: 1', 'noneExistant: 0'].join('\n')}\n\nMinimum occurance: 0\n`);
});

test('Search: -p -k -r -oc -so -rv Should accept csv keys and search recursively & display occurances sorted alphabetically by key & reversed', async () => {
    let result = await  cli([`s ${testDirA} b,a,noneExistant,recursive`, '-p', '-k', '-r', '-oc', '-so', '-rv'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['a: 34', 'b: 31', 'recursive: 1', 'noneExistant: 0'].reverse().join('\n')}\n\nMinimum occurance: 0\n`);
});

test('Search: -p -k -r -oc -so -rv -i Should accept csv keys and search recursively & display occurances sorted by occurance ignoring case & reversed', async () => {
    let result = await  cli([`s ${testDirA} b,a,noneExistant,recursive`, '-p', '-k', '-r', '-oc', '-so', '-rv', '-i'], '.');
    expect(result.stdout.split('..\n\n')[1]).toBe(`${['b: 34', 'a: 34', 'recursive: 1', 'noneExistant: 0'].reverse().join('\n')}\n\nMinimum occurance: 0\n`);
});
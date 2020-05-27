const {
    readFile,
    removeDuplicates,
    removeBlanks,
    lowerCase,
    cli,
} = require('./Shared/testMethods')

const testFileA = './TestData/keys.txt'
const linesA = readFile(testFileA, '\n')

// Test for process
test('Process: Code should be 0', async () => {
    let result = await  cli([`p ${testFileA}`, '-p'], '.');
    expect(result.code).toBe(0);
});

test('Process: -p output should show entire contents of input file', async () => {
    let result = await  cli([`p ${testFileA}`, '-p'], '.');
    const lines = linesA.slice(0).join('\n')

    expect(result.stdout).toBe(`Reading input file...\n\n${lines}\n`)
});

test('Process: -p -d output should contain no duplicate entries', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-d'], '.');
    let lines = removeDuplicates(linesA.slice(0)).join('\n')
    expect(result.stdout).toBe(`Reading input file...\nRemoving duplicates..\n\n${lines}\n`)
});

test('Process: -p -b output should contain no blank entries', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-b'], '.');
    let lines = removeBlanks(linesA.slice(0)).join('\n')
    expect(result.stdout).toBe(`Reading input file...\nRemoving blank entries..\n\n${lines}\n`)
});

test('Process: -p -d -b output should contain no duplicate or blank entries', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-d', '-b'], '.');
    let lines = removeBlanks(removeDuplicates(linesA.slice(0))).join('\n')
    expect(result.stdout).toBe(`Reading input file...\nRemoving duplicates..\nRemoving blank entries..\n\n${lines}\n`)
});

test('Process: -p -s output should show entire contents of input file sorted', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-s'], '.');
    const lines = linesA.slice(0).sort().join('\n')

    expect(result.stdout).toBe(`Reading input file...\nSorting entries..\n\n${lines}\n`)
});
test('Process: -p -rv output should show entire contents of input file reversed', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-rv'], '.');
    let lines = linesA.slice(0).reverse().join('\n')

    expect(result.stdout).toBe(`Reading input file...\nReversing entries..\n\n${lines}\n`)
});
test('Process: -p -s -rv output should show entire contents of input file sorted then reversed', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-s', '-rv'], '.');
    let lines = linesA.slice(0).sort().reverse().join('\n')

    expect(result.stdout).toBe(`Reading input file...\nSorting entries..\nReversing entries..\n\n${lines}\n`)
});

test('Process: -p -l output should show entire contents of input file in lower case', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-l'], '.');
    const lines = lowerCase(linesA.slice(0)).join('\n')

    expect(result.stdout).toBe(`Reading input file...\nLower casing every entry..\n\n${lines}\n`)
});

test('Process: -p -d -l output should contain no duplicate entries after lowercasing', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-d', '-l'], '.');
    let lines = removeDuplicates(lowerCase(linesA.slice(0))).join('\n')
    expect(result.stdout).toBe(`Reading input file...\nLower casing every entry..\nRemoving duplicates..\n\n${lines}\n`)
});

test('Process: -p -b -l output should contain no blank entries after lowercasing', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-b', '-l'], '.');
    let lines = removeBlanks(lowerCase(linesA.slice(0))).join('\n')
    expect(result.stdout).toBe(`Reading input file...\nLower casing every entry..\nRemoving blank entries..\n\n${lines}\n`)
});

test('Process: -p -d -b -l output should contain no duplicate or blank entries', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-d', '-b', '-l'], '.');
    let lines = removeBlanks(removeDuplicates(lowerCase(linesA.slice(0)))).join('\n')
    expect(result.stdout).toBe(`Reading input file...\nLower casing every entry..\nRemoving duplicates..\nRemoving blank entries..\n\n${lines}\n`)
});

test('Process: -p -s -l output should show entire contents of input file sorted and lower cased', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-s', '-l'], '.');
    const lines = lowerCase(linesA.slice(0)).sort().join('\n')

    expect(result.stdout).toBe(`Reading input file...\nLower casing every entry..\nSorting entries..\n\n${lines}\n`)
});
test('Process: -p -rv -l output should show entire contents of input file reversed and lower cased', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-rv', '-l'], '.');
    let lines = lowerCase(linesA.slice(0)).reverse().join('\n')

    expect(result.stdout).toBe(`Reading input file...\nLower casing every entry..\nReversing entries..\n\n${lines}\n`)
});
test('Process: -p -s -rv -l output should show entire contents of input file lower cased then sorted then reversed', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-s', '-rv', '-l'], '.');
    let lines = lowerCase(linesA.slice(0)).sort().reverse().join('\n')

    expect(result.stdout).toBe(`Reading input file...\nLower casing every entry..\nSorting entries..\nReversing entries..\n\n${lines}\n`)
});

test('Process: -p -rk t output should show all keys in file without entries containing t', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-rk t'], '.');
    expect(!result.stdout.slice(63).includes('t')).toBe(true)
    expect(result.stdout.slice(63).includes('T')).toBe(true)
});

test('Process: -p -rk t -i output should show all keys in file without entries containing t or T', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-rk t', '-i'], '.');
    expect(!result.stdout.slice(63).includes('t')).toBe(true)
    expect(!result.stdout.slice(63).includes('T')).toBe(true)
});

test('Process: -p -rb B output should show all keys in file without entries containing ^big', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-rb B'], '.');
    expect(!result.stdout.slice(63).includes('^big')).toBe(true)
    expect(result.stdout.slice(63).includes('^small')).toBe(true)
});

test('Process: -p -rb B -i output should show all keys in file without entries containing ^small or ^big', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-rb B', '-i'], '.');
    expect(!result.stdout.slice(63).includes('^big')).toBe(true)
    expect(!result.stdout.slice(63).includes('^small')).toBe(true)
});

test('Process: -p -ra B output should show all keys in file without entries containing $big', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-ra B'], '.');
    expect(!result.stdout.slice(63).includes('$big')).toBe(true)
    expect(result.stdout.slice(63).includes('$small')).toBe(true)
});
test('Process: -p -ra B -i output should show all keys in file without entries containing $big or $small', async () => {
    let result = await  cli([`p ${testFileA}`, '-p', '-ra B', '-i'], '.');
    expect(!result.stdout.slice(63).includes('$big')).toBe(true)
    expect(!result.stdout.slice(63).includes('$small')).toBe(true)
});

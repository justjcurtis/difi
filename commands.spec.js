let path = require('path');
let exec = require('child_process').exec;

test('Code should be 0 for process', async () => {
    let result = await  cli(['p keys.txt', '-p'], './TestData/');
    expect(result.code).toBe(0);
  });

test('Code should be 0 for compare', async () => {
    let result = await  cli(['c keys.txt keys_difi.txt', '-p'], './TestData/');
    expect(result.code).toBe(0);
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
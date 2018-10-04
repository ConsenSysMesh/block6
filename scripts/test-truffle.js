var exec = require('child_process').exec;

process.env.NODE_ENV = 'test';


exec('truffle test', function(error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
      console.log('exec error: ' + error);
  }
});
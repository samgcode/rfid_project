const { exec } = require('child_process');
exec('echo test', (err, stdout) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
    console.log(stdout);
  }
});
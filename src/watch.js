var filewatcher = require('filewatcher');
var execSync = require('child_process').execSync;
var watcher = filewatcher();

watcher.add('src');

watcher.on('change', function() {
  console.log('rebuilding json');
  execSync('npm run build');
});

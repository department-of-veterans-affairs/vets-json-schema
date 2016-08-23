var filewatcher = require('filewatcher');
var execSync = require('child_process').execSync;
var watcher = filewatcher();

watcher.add('src');
console.log('watching for changes in src dir..');

watcher.on('change', function() {
  console.log('rebuilding json');
  execSync('npm run build');
});

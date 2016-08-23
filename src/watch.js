var watch = require('node-watch');
var execSync = require('child_process').execSync;

console.log('watching for changes in src dir..');

watch('src', { recursive: true }, function(){
  console.log('rebuilding json');
  execSync('npm run build');
});

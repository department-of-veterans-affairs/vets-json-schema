var watch = require('node-watch');
var execSync = require('child_process').execSync;

console.log('watching for changes in src dir..');

watch('src', { recursive: true }, function(){
  execSync('npm run build', { stdio:[0,1,2] });
});

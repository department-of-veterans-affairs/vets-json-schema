import watch from 'node-watch';
import { execSync } from 'child_process';

console.log('watching for changes in src dir..');

watch('src', { recursive: true }, () => {
  execSync('npm run build', { stdio:[0,1,2] });
});

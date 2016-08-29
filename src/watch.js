import watch from 'node-watch';
import { execSync } from 'child_process';

const build = () => {
  execSync('npm run build', { stdio:[0,1,2] });
};

build();

console.log('watching for changes in src dir..');

watch('src', { recursive: true }, build);

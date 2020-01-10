import watch from 'node-watch';
import { execSync } from 'child_process';

const build = () => {
  try {
    execSync('npm run build', { stdio: [0, 1, 2] });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};

build();

// eslint-disable-next-line no-console
console.log('watching for changes in src dir..');

watch('src', { recursive: true }, build);

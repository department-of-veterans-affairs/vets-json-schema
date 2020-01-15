require('@babel/register');

// eslint-disable-next-line default-case
switch (process.argv[2]) {
  case 'build':
    require('./generate-schemas');
    break;
  case 'watch':
    require('./watch');
    break;
}

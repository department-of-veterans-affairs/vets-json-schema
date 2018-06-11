require('@babel/register');

switch(process.argv[2]) {
  case 'build':
    require('./generate-schemas');
    break;
  case 'watch':
    require('./watch');
    break;
}

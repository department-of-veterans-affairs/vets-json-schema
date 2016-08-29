import eduBenefitsSchema from './edu-benefits/schema';
import jsonfile from 'jsonfile';

jsonfile.writeFileSync('dist/edu-benefits-schema.json', eduBenefitsSchema, { spaces: 2 });
console.log('json built');

import eduBenefitsSchema from './edu-benefits/schema';
import jsonfile from 'jsonfile';

console.log('building json');
jsonfile.writeFileSync('dist/edu-benefits-schema.json', eduBenefitsSchema, { spaces: 2 });

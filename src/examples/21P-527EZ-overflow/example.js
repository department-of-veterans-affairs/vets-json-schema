// Run the tranformer on the complete JSON to create a subset of example data that is more suitable for backend usage.
import transform from '../../common/transform';

export default transform(require('../../schemas/21P-527EZ-overflow/example.json'));

import dev from './dev'
import prod from './prod'
const baseUrl = process.env.NODE_ENV === 'development' ? dev : prod
export default baseUrl

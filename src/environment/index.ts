import { environmentDev } from './environment-dev'
import { environmentProd } from './environment-prod'

let environment: typeof environmentDev = null;
const env = process.env.NODE_ENV

if(env == "development") {
  environment = environmentDev
}
else if (env == "production") {
  environment = environmentProd
}

export { environment }
import Amplify from 'aws-amplify'
import AmplifyConfig from './aws-exports'

export { AmplifyConfig }

export const configure = () => {
  Amplify.configure(AmplifyConfig)
}
import { CognitoUser } from 'amazon-cognito-identity-js'
import { createContext } from 'react'

export const AmplifyUserContext = createContext<CognitoUser | undefined>(
  undefined
)